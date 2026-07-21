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
  /^כיתה (?<grade>.+?) (?<audience>מעורב|בנות|בנים|בנים \+ בנות) תוכנית (?<program>מחוננים|מצטיינים) לומד(?:ים|ות) ביום (?<day>.+?) בין (?<start>\d{1,2}:\d{2}).*?ל-?(?<end>\d{1,2}:\d{2})/;

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
        startTime: groupMatch.groups.start ?? '',
        endTime: groupMatch.groups.end ?? '',
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
        id: courseId,
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
