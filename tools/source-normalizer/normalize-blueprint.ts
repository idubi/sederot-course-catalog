import { createHash } from 'node:crypto';

import type {
  BlueprintDocument,
  BlueprintNode,
  SourceLocation,
} from '../source-reader/blueprint-reader';

export const NORMALIZED_DRAFT_PATH =
  'content/draft/import/normalized-catalog.json';

export interface SourceEvidence {
  raw: string;
  location: SourceLocation;
}

export interface NormalizedProgram {
  id: 'gifted' | 'excellence';
  name: string;
  category: 'gifted' | 'excellence';
  sources: SourceEvidence[];
}

export interface NormalizedAudienceGroup {
  id: string;
  programId: NormalizedProgram['id'];
  gradeGroupId: string;
  gradeLabels: string[];
  gradeValues: string[];
  gender: 'boys' | 'girls' | 'mixed';
  rawAudienceLabel: string;
  day: string;
  startTime: string;
  endTime: string;
  source: SourceEvidence;
}

export interface NormalizedCourse {
  id: string;
  name: string;
  temporaryName: boolean;
  descriptionHtml: string;
  declaredAudienceLabels: string[];
  instructors: string[];
  sourceNames: SourceEvidence[];
}

export interface NormalizedOffering {
  id: string;
  courseId: string;
  audienceGroupId: string;
  semester: 'annual';
  displayOrder: number;
  source: SourceEvidence;
}

export interface NormalizedBlueprintDraft {
  source: { path: string; sha256: string };
  programs: NormalizedProgram[];
  audienceGroups: NormalizedAudienceGroup[];
  courses: NormalizedCourse[];
  offerings: NormalizedOffering[];
  unmatchedNodes: SourceEvidence[];
}

const groupPattern =
  /^כיתה (?<grade>.+?) (?<audience>מעורב|בנות|בנים|בנים \+ בנות) תוכנית (?<program>מחוננים|מצטיינים) לומד(?:ים|ות) ביום (?<day>.+?) בין (?<start>\d{1,2}\s*:\s*\d{2}).*?ל\s*[-–—]?\s*(?<end>\d{1,2}\s*:\s*\d{2})/;

const gradeValues = new Map([
  ['ג', '3'],
  ['ד', '4'],
  ['ה', '5'],
  ['ו', '6'],
  ['ז', '7'],
  ['ח', '8'],
  ['ט', '9'],
]);

function evidence(node: BlueprintNode): SourceEvidence {
  return { raw: node.raw, location: node.location };
}

function stableId(prefix: string, value: string): string {
  const digest = createHash('sha256').update(value).digest('hex').slice(0, 12);
  return `${prefix}-${digest}`;
}

function parseGrades(rawGrade: string): {
  gradeGroupId: string;
  gradeLabels: string[];
  gradeValues: string[];
} {
  const labels = rawGrade.split('-').map((label) => label.trim());
  const values = labels.map((label) => {
    const letter = label.replace(/[׳'״"\s]/g, '');
    return (
      gradeValues.get(letter) ?? `unknown-${stableId('grade', label).slice(6)}`
    );
  });
  return {
    gradeGroupId: `${values.length === 1 ? 'grade' : 'grades'}-${values.join('-')}`,
    gradeLabels: labels,
    gradeValues: values,
  };
}

function programFromLabel(
  label: string,
): Pick<NormalizedProgram, 'id' | 'name' | 'category'> {
  return label === 'מחוננים'
    ? { id: 'gifted', name: 'תוכנית מחוננים', category: 'gifted' }
    : { id: 'excellence', name: 'תוכנית מצטיינים', category: 'excellence' };
}

function genderFromLabel(label: string): NormalizedAudienceGroup['gender'] {
  if (label === 'בנים') return 'boys';
  if (label === 'בנות') return 'girls';
  return 'mixed';
}

function normalizeTime(value: string): string {
  const [hour = '', minute = ''] = value.replace(/\s/gu, '').split(':');
  return `${hour.padStart(2, '0')}:${minute}`;
}

function normalizeCourseName(raw: string): {
  name: string;
  temporaryName: boolean;
} {
  const temporaryName = /\(שם זמני\)\s*$/.test(raw);
  const withoutMarker = raw.replace(/\s*\(שם זמני\)\s*$/, '');
  return {
    name: withoutMarker.normalize('NFKC').replace(/\s+/g, ' ').trim(),
    temporaryName,
  };
}

function comparisonTokens(value: string): string[] {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('he')
    .replace(/n\.l\.?\s*playback/giu, 'nlp פלייבק')
    .replace(/nlp(?=פלייבק)/giu, 'nlp ')
    .replace(/3d/giu, 'תלת מימד')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/u)
    .filter(
      (token) =>
        token.length > 1 &&
        !['את', 'של', 'עם', 'קורס', 'מסע', 'שם', 'זמני'].includes(token),
    );
}

function detailMatchesCourse(title: string, courseName: string): boolean {
  const titleTokens = new Set(comparisonTokens(title));
  const courseTokens = comparisonTokens(courseName.split('/')[0] ?? courseName);
  if (courseTokens.length === 0) return false;
  const matches = courseTokens.filter((token) => titleTokens.has(token)).length;
  return (
    matches === courseTokens.length || matches / courseTokens.length >= 0.6
  );
}

function instructorNames(value: string): string[] {
  const cleaned = value
    .replace(/\*\*/gu, '')
    .replace(/^\s*(?:בהנחיית|המורה|מורה)\s*:?[\s-]*/u, '')
    .trim();
  const conjunction = cleaned.lastIndexOf(' ו');
  const before = cleaned.slice(0, conjunction).trim();
  const after = cleaned.slice(conjunction + 2).trim();
  return conjunction > 0 && before.split(/\s+/u).length >= 2 && after
    ? [before, after]
    : [cleaned].filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#39;');
}

function linkCourseDetails(
  document: BlueprintDocument,
  courses: Map<string, NormalizedCourse>,
): void {
  const nodes = document.nodes;
  for (let index = 0; index < nodes.length; index += 1) {
    const instructorNode = nodes[index];
    if (
      !instructorNode ||
      !/^\s*(?:בהנחיית|המורה|מורה)\s*:?/u.test(
        instructorNode.text.replace(/\*\*/gu, ''),
      )
    ) {
      continue;
    }
    let titleIndex = index - 1;
    while (titleIndex >= 0 && nodes[titleIndex]?.kind === 'blank')
      titleIndex -= 1;
    const titleNode = nodes[titleIndex];
    if (!titleNode) continue;
    let matches = [...courses.values()].filter((course) =>
      detailMatchesCourse(titleNode.text, course.name),
    );
    if (/הקוד הסודי של החיים/u.test(titleNode.text)) {
      matches = [...courses.values()].filter(({ name }) =>
        /^גנטיקה\s*\//u.test(name),
      );
    } else if (/^מעצבי העתיד$/u.test(titleNode.text.trim())) {
      matches = [...courses.values()].filter(({ name }) => name === 'פיתוח VR');
    }
    if (matches.length === 0) continue;

    const paragraphs: string[] = [];
    const declaredAudienceLabels: string[] = [];
    let assignmentTable = false;
    for (
      let detailIndex = index + 1;
      detailIndex < nodes.length;
      detailIndex += 1
    ) {
      const node = nodes[detailIndex];
      if (!node) break;
      if (/הקורס מופיע בעמודים/u.test(node.text)) {
        assignmentTable = true;
        continue;
      }
      if (assignmentTable && node.kind === 'heading') break;
      if (assignmentTable && node.kind === 'table-row') {
        declaredAudienceLabels.push(
          ...node.text
            .split('|')
            .map((cell) => cell.trim())
            .filter((cell) => cell.length > 0 && !/^[-: ]+$/u.test(cell)),
        );
      } else if (
        !assignmentTable &&
        node.kind === 'paragraph' &&
        node.text.trim()
      ) {
        paragraphs.push(node.text.trim());
      }
    }
    for (const course of matches) {
      course.instructors = instructorNames(instructorNode.text);
      course.declaredAudienceLabels = [...new Set(declaredAudienceLabels)];
      course.descriptionHtml = paragraphs
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('');
    }
  }
}

export function normalizeBlueprint(
  document: BlueprintDocument,
): NormalizedBlueprintDraft {
  const programs = new Map<NormalizedProgram['id'], NormalizedProgram>();
  const audienceGroups: NormalizedAudienceGroup[] = [];
  const courses = new Map<string, NormalizedCourse>();
  const offerings: NormalizedOffering[] = [];
  const consumedNodeIndexes = new Set<number>();
  let activeGroup: NormalizedAudienceGroup | undefined;
  let displayOrder = 0;

  document.nodes.forEach((node, nodeIndex) => {
    if (node.kind === 'heading') {
      activeGroup = undefined;
      return;
    }
    if (node.kind !== 'list-item') return;

    const groupMatch = node.text.match(groupPattern);
    if (groupMatch?.groups) {
      const program = programFromLabel(groupMatch.groups.program ?? '');
      const existingProgram = programs.get(program.id);
      if (existingProgram) existingProgram.sources.push(evidence(node));
      else programs.set(program.id, { ...program, sources: [evidence(node)] });

      const grades = parseGrades(groupMatch.groups.grade ?? 'לא ידוע');
      const gender = genderFromLabel(groupMatch.groups.audience ?? '');
      activeGroup = {
        id: `${program.id}-${grades.gradeGroupId}-${gender}`,
        programId: program.id,
        ...grades,
        gender,
        rawAudienceLabel: groupMatch.groups.audience ?? '',
        day: groupMatch.groups.day ?? '',
        startTime: normalizeTime(groupMatch.groups.start ?? ''),
        endTime: normalizeTime(groupMatch.groups.end ?? ''),
        source: evidence(node),
      };
      audienceGroups.push(activeGroup);
      displayOrder = 0;
      consumedNodeIndexes.add(nodeIndex);
      return;
    }

    if (!activeGroup) return;

    const normalized = normalizeCourseName(node.text);
    if (!normalized.name) return;
    const courseKey = normalized.name;
    const existingCourse = courses.get(courseKey);
    const courseId = existingCourse?.id ?? stableId('course', courseKey);
    if (existingCourse) {
      existingCourse.temporaryName ||= normalized.temporaryName;
      existingCourse.sourceNames.push(evidence(node));
    } else {
      courses.set(courseKey, {
        declaredAudienceLabels: [],
        descriptionHtml: '',
        id: courseId,
        instructors: [],
        name: normalized.name,
        temporaryName: normalized.temporaryName,
        sourceNames: [evidence(node)],
      });
    }

    offerings.push({
      id: `${activeGroup.id}-offering-${String(displayOrder + 1).padStart(2, '0')}`,
      courseId,
      audienceGroupId: activeGroup.id,
      semester: 'annual',
      displayOrder,
      source: evidence(node),
    });
    displayOrder += 1;
    consumedNodeIndexes.add(nodeIndex);
  });

  linkCourseDetails(document, courses);

  return {
    source: { path: document.path, sha256: document.sha256 },
    programs: [...programs.values()],
    audienceGroups,
    courses: [...courses.values()],
    offerings,
    unmatchedNodes: document.nodes
      .filter((_, index) => !consumedNodeIndexes.has(index))
      .map(evidence),
  };
}
