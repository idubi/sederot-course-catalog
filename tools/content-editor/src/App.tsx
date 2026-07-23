import { useEffect, useMemo, useState } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogShapeMessage,
  formatImportedJson,
  isEditableCatalog,
  isLegacyCatalog,
} from '../catalog-import';
import { persistEditorText, resetEditorState } from '../editor-state';
import { CourseOfferingForms } from './CourseOfferingForms';
import { ProgramGroupForms } from './ProgramGroupForms';
import {
  classifyDiagnostics,
  type DiagnosticState,
  type ImportDiagnostic,
} from './diagnostics';

type Message = { kind: 'error' | 'success'; text: string } | null;
const diagnosticStateLabels: Record<DiagnosticState, string> = {
  active: 'פעיל',
  resolved: 'נפתר',
  stale: 'לא עדכני',
  duplicate: 'כפול',
};
const PINNED_DIAGNOSTICS_KEY = 'sderot-editor-pinned-diagnostics';

async function requestJson(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok) throw new Error(JSON.stringify(body));
  return body;
}

export function App() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'groups' | 'programs'>(
    'courses',
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState<Message>(null);
  const [acknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [bootstrapFolder, setBootstrapFolder] = useState('');
  const [importDiagnostics, setImportDiagnostics] = useState<
    ImportDiagnostic[]
  >([]);
  const [diagnosticFilter, setDiagnosticFilter] = useState<
    'all' | 'saved' | DiagnosticState
  >('active');
  const [pinnedDiagnosticKeys, setPinnedDiagnosticKeys] = useState<Set<string>>(
    () => {
      try {
        const value = JSON.parse(
          localStorage.getItem(PINNED_DIAGNOSTICS_KEY) ?? '[]',
        ) as unknown;
        return new Set(
          Array.isArray(value)
            ? value.filter((item): item is string => typeof item === 'string')
            : [],
        );
      } catch {
        return new Set();
      }
    },
  );
  const [lastDiagnosticKey, setLastDiagnosticKey] = useState<string | null>(
    null,
  );
  const parsedJson = useMemo(() => {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return null;
    }
  }, [text]);
  const parsedCatalog: Catalog | null = isEditableCatalog(parsedJson)
    ? parsedJson
    : null;
  const shapeMessage = parsedJson ? catalogShapeMessage(parsedJson) : null;
  const relationshipWarnings = parsedCatalog
    ? parsedCatalog.courses
        .filter(
          (course) =>
            !parsedCatalog.offerings.some(
              ({ courseId }) => courseId === course.id,
            ),
        )
        .map((course) => `הקורס אינו משויך לאף תוכנית או קבוצה: ${course.name}`)
    : [];
  const classifiedDiagnostics = parsedCatalog
    ? classifyDiagnostics(importDiagnostics, parsedCatalog)
    : [];
  const visibleDiagnostics = classifiedDiagnostics.filter(
    ({ key, state }) =>
      diagnosticFilter === 'all' ||
      (diagnosticFilter === 'saved'
        ? pinnedDiagnosticKeys.has(key)
        : state === diagnosticFilter),
  );
  const activeImportWarnings = classifiedDiagnostics
    .filter(
      ({ diagnostic, state }) =>
        state === 'active' && diagnostic.severity === 'warning',
    )
    .map(({ diagnostic }) => diagnostic.message);

  useEffect(() => {
    const timer = window.setTimeout(
      () => persistEditorText(localStorage, text),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!parsedCatalog) return;
    if (!parsedCatalog.courses.some(({ id }) => id === selectedCourseId))
      setSelectedCourseId(parsedCatalog.courses[0]?.id ?? null);
    if (!parsedCatalog.audienceGroups.some(({ id }) => id === selectedGroupId))
      setSelectedGroupId(parsedCatalog.audienceGroups[0]?.id ?? null);
    if (!parsedCatalog.programs.some(({ id }) => id === selectedProgramId))
      setSelectedProgramId(parsedCatalog.programs[0]?.id ?? null);
  }, [parsedCatalog, selectedCourseId, selectedGroupId, selectedProgramId]);

  useEffect(() => {
    localStorage.setItem(
      PINNED_DIAGNOSTICS_KEY,
      JSON.stringify([...pinnedDiagnosticKeys]),
    );
  }, [pinnedDiagnosticKeys]);

  function catalog() {
    return JSON.parse(text) as unknown;
  }

  async function load(source: 'approved' | 'draft') {
    try {
      const result = await requestJson(`/api/catalog?source=${source}`);
      setText(`${JSON.stringify(result.catalog, null, 2)}\n`);
      setMessage({
        kind: 'success',
        text: source === 'draft' ? 'הטיוטה נטענה' : 'התוכן המאושר נטען',
      });
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'הטעינה נכשלה',
      });
    }
  }

  async function loadFile(file: File | undefined) {
    if (!file) return;
    try {
      const source = await file.text();
      const parsed = JSON.parse(source) as unknown;
      if (isLegacyCatalog(parsed)) {
        const result = await requestJson('/api/migrate-baseline', {
          method: 'POST',
          body: JSON.stringify({ catalog: parsed }),
        });
        const diagnostics = Array.isArray(result.diagnostics)
          ? (result.diagnostics as ImportDiagnostic[])
          : [];
        setText(`${JSON.stringify(result.catalog, null, 2)}\n`);
        setImportDiagnostics(diagnostics);
        setMessage({
          kind: 'success',
          text: `הקובץ ${file.name} הומר לטיוטת הסכמה עם ${diagnostics.length} אבחונים`,
        });
      } else {
        setText(formatImportedJson(source));
        setImportDiagnostics([]);
        setMessage({
          kind: 'success',
          text: `הקובץ ${file.name} נטען מהכונן`,
        });
      }
    } catch {
      setMessage({ kind: 'error', text: 'הקובץ שנבחר אינו JSON תקין' });
    }
  }

  async function loadAnyFile(file: File | undefined) {
    if (!file) return;
    if (/\.json$/iu.test(file.name)) await loadFile(file);
    else await loadDocument(file);
    setActiveTab('courses');
  }

  async function loadDocument(file: File | undefined) {
    if (!file) return;
    try {
      const isDocx = file.name.toLowerCase().endsWith('.docx');
      const dataBase64 = isDocx
        ? await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(new Error('קריאת קובץ Word נכשלה'));
            reader.onload = () =>
              resolve(String(reader.result).split(',', 2)[1] ?? '');
            reader.readAsDataURL(file);
          })
        : undefined;
      const result = await requestJson('/api/import-document', {
        method: 'POST',
        body: JSON.stringify({
          dataBase64,
          fileName: file.name,
          source: isDocx ? undefined : await file.text(),
        }),
      });
      const diagnostics = Array.isArray(result.diagnostics)
        ? (result.diagnostics as ImportDiagnostic[])
        : [];
      setText(`${JSON.stringify(result.catalog, null, 2)}\n`);
      setImportDiagnostics(diagnostics);
      setMessage({
        kind: 'success',
        text: `${file.name} הומר לטיוטת JSON עם ${diagnostics.length} אבחונים`,
      });
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'ייבוא מסמך המקור נכשל',
      });
    }
  }

  async function submit(action: 'draft' | 'export' | 'validate') {
    try {
      const routes = {
        draft: ['/api/catalog/draft', 'PUT'],
        export: ['/api/catalog/export', 'POST'],
        validate: ['/api/validate', 'POST'],
      } as const;
      const [path, method] = routes[action];
      const result = await requestJson(path, {
        method,
        body: JSON.stringify({
          catalog: catalog(),
          acknowledgeWarnings,
          warnings: activeImportWarnings,
        }),
      });
      const labels = {
        draft: 'הטיוטה נשמרה',
        export: 'התוכן המאושר יוצא',
        validate: 'התוכן תקין',
      };
      setMessage({
        kind: 'success',
        text: `${labels[action]} (${JSON.stringify(result)})`,
      });
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'הפעולה נכשלה',
      });
    }
  }

  async function exportBootstrap() {
    try {
      const result = await requestJson('/api/catalog/bootstrap', {
        method: 'POST',
        body: JSON.stringify({
          acknowledgeWarnings,
          catalog: catalog(),
          folderName: bootstrapFolder.trim(),
          warnings: activeImportWarnings,
        }),
      });
      setMessage({
        kind: 'success',
        text: `bootstrap.json נשמר בתוך contents/${bootstrapFolder.trim()} (${JSON.stringify(result)})`,
      });
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'ייצוא Bootstrap נכשל',
      });
    }
  }

  function reset() {
    if (
      !window.confirm(
        'לאפס את תוכן העורך והשמירה האוטומטית בדפדפן? קבצים בכונן לא יימחקו.',
      )
    )
      return;

    resetEditorState(localStorage);
    setText('');
    setBootstrapFolder('');
    setAcknowledgeWarnings(false);
    setImportDiagnostics([]);
    setMessage({
      kind: 'success',
      text: 'העורך אופס. קובצי הטיוטה והתוכן המאושר בכונן לא שונו.',
    });
  }

  return (
    <main className="editor-shell">
      <header className="editor-header">
        <div>
          <p className="eyebrow">כלי פיתוח מקומי בלבד</p>
          <h1>עורך התוכן</h1>
          <p>טעינה, שמירת טיוטה וייצוא JSON מאושר</p>
        </div>
        <span className="api-state api-state--ready">127.0.0.1</span>
      </header>

      <section className="notice">
        <h2>גבול בטוח</h2>
        <p>
          שמירה אוטומטית נשארת בדפדפן. שמירת טיוטה וייצוא כותבים רק לנתיבי התוכן
          המוגדרים במאגר.
        </p>
      </section>

      {!parsedCatalog ? (
        <section className="import-screen" aria-labelledby="import-title">
          <h2 id="import-title">טעינת פרופיל מקובץ</h2>
          <p>בחרו מסמך Word, Markdown, טקסט או קובץ JSON כדי להתחיל.</p>
          <label className="file-drop">
            <span>בחירת קובץ</span>
            <input
              type="file"
              accept="application/json,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,text/plain,.json,.docx,.md,.txt"
              onChange={(event) => void loadAnyFile(event.target.files?.[0])}
            />
          </label>
          <div className="toolbar">
            <button type="button" onClick={() => void load('approved')}>
              טעינת מאושר
            </button>
            <button type="button" onClick={() => void load('draft')}>
              טעינת טיוטה
            </button>
          </div>
        </section>
      ) : (
        <>
          <div className="toolbar" aria-label="פעולות קובץ">
            <button type="button" onClick={() => void submit('validate')}>
              אימות
            </button>
            <button type="button" onClick={() => void submit('draft')}>
              שמירת טיוטה
            </button>
            <button
              className="primary"
              type="button"
              onClick={() => void submit('export')}
            >
              ייצוא מאושר
            </button>
            <button className="danger" type="button" onClick={reset}>
              איפוס העורך
            </button>
          </div>

          <section className="import-panel" aria-labelledby="bootstrap-title">
            <h2 id="bootstrap-title">ייצוא סביבת Bootstrap</h2>
            <label>
              שם תיקייה תחת contents
              <input
                dir="ltr"
                required
                pattern="[a-z0-9][a-z0-9._-]*"
                placeholder="school-year-2026-2027"
                value={bootstrapFolder}
                onChange={(event) => setBootstrapFolder(event.target.value)}
              />
            </label>
            <button
              type="button"
              disabled={!bootstrapFolder.trim()}
              onClick={() => void exportBootstrap()}
            >
              ייצוא contents/&lt;folder&gt;/bootstrap.json
            </button>
            <p>
              הייצוא דורש Schema תקין ואישור אזהרות. הוא אינו משנה תוכן מאושר.
            </p>
          </section>

          <label className="warning-check">
            <input
              type="checkbox"
              checked={acknowledgeWarnings}
              onChange={(event) => setAcknowledgeWarnings(event.target.checked)}
            />
            בדקתי ואני מאשר/ת את האזהרות לפני ייצוא
          </label>

          {message && (
            <p className={`message message--${message.kind}`} role="status">
              {message.text}
            </p>
          )}

          {shapeMessage && (
            <p className="message message--error" role="alert">
              {shapeMessage}
            </p>
          )}

          {importDiagnostics.length > 0 && (
            <details className="diagnostics-panel" open>
              <summary>אבחוני המרה ({importDiagnostics.length})</summary>
              <p>
                אבחונים פעילים דורשים בדיקה. אבחונים שנפתרו או אינם עדכניים
                נשמרים כראיית מקור ואינם מוצגים כאזהרה פעילה.
              </p>
              <label>
                סינון אבחונים
                <select
                  value={diagnosticFilter}
                  onChange={(event) =>
                    setDiagnosticFilter(
                      event.target.value as typeof diagnosticFilter,
                    )
                  }
                >
                  <option value="active">פעילים</option>
                  <option value="resolved">נפתרו</option>
                  <option value="stale">לא עדכניים</option>
                  <option value="duplicate">כפולים</option>
                  <option value="saved">
                    שמורים לחזרה ({pinnedDiagnosticKeys.size})
                  </option>
                  <option value="all">הכול</option>
                </select>
              </label>
              <ul>
                {visibleDiagnostics.map(
                  ({ diagnostic, entity, key, state }) => (
                    <li
                      id={`diagnostic-${key}`}
                      className={`diagnostic diagnostic--${state}`}
                      key={key}
                    >
                      <strong>
                        {diagnostic.severity === 'error'
                          ? 'שגיאה'
                          : diagnostic.severity === 'warning'
                            ? 'אזהרה'
                            : 'מידע'}
                        :
                      </strong>{' '}
                      <span className="diagnostic-state">
                        {diagnosticStateLabels[state]}
                      </span>{' '}
                      {diagnostic.message}
                      <div className="diagnostic-context">
                        <code>{diagnostic.path.join('.')}</code>
                        {diagnostic.sourceLocation && (
                          <span>
                            {diagnostic.sourceFile ?? 'מסמך מקור'}, שורה{' '}
                            {diagnostic.sourceLocation.line}
                          </span>
                        )}
                        {diagnostic.sourceExcerpt && (
                          <q>{diagnostic.sourceExcerpt}</q>
                        )}
                      </div>
                      <button
                        type="button"
                        aria-pressed={pinnedDiagnosticKeys.has(key)}
                        onClick={() =>
                          setPinnedDiagnosticKeys((current) => {
                            const next = new Set(current);
                            if (next.has(key)) next.delete(key);
                            else next.add(key);
                            return next;
                          })
                        }
                      >
                        {pinnedDiagnosticKeys.has(key)
                          ? 'הסרה מהשמורים'
                          : 'שמירה לחזרה מאוחרת'}
                      </button>
                      {entity && (
                        <button
                          type="button"
                          onClick={() => {
                            setLastDiagnosticKey(key);
                            setActiveTab(entity.tab);
                            const entityId = entity.id.replace(
                              /^(?:course|group|program)-/u,
                              '',
                            );
                            if (entity.tab === 'courses')
                              setSelectedCourseId(entityId);
                            else if (entity.tab === 'groups')
                              setSelectedGroupId(entityId);
                            else setSelectedProgramId(entityId);
                            window.setTimeout(
                              () =>
                                document
                                  .getElementById(entity.id)
                                  ?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                  }),
                              0,
                            );
                          }}
                        >
                          מעבר לישות
                        </button>
                      )}
                    </li>
                  ),
                )}
              </ul>
              {visibleDiagnostics.length === 0 && (
                <p role="status">אין אבחונים התואמים למסנן.</p>
              )}
            </details>
          )}

          {relationshipWarnings.length > 0 && (
            <section
              className="diagnostics-panel"
              aria-labelledby="relations-title"
            >
              <h2 id="relations-title">אזהרות שיוך</h2>
              <ul>
                {relationshipWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </section>
          )}

          {lastDiagnosticKey && (
            <button
              className="return-to-diagnostic"
              type="button"
              onClick={() => {
                setDiagnosticFilter(
                  pinnedDiagnosticKeys.has(lastDiagnosticKey) ? 'saved' : 'all',
                );
                window.setTimeout(
                  () =>
                    document
                      .getElementById(`diagnostic-${lastDiagnosticKey}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                  0,
                );
              }}
            >
              חזרה לאבחון האחרון
            </button>
          )}

          <nav className="entity-tabs" aria-label="ישויות קטלוג">
            {(
              [
                ['courses', 'קורסים'],
                ['groups', 'קבוצות'],
                ['programs', 'תוכניות'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={activeTab === id ? 'active' : ''}
                aria-pressed={activeTab === id}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <section className="tab-workspace">
            {activeTab === 'programs' && (
              <ProgramGroupForms
                view="programs"
                catalog={parsedCatalog}
                selectedId={selectedProgramId}
                onSelect={setSelectedProgramId}
                onChange={(value) =>
                  setText(`${JSON.stringify(value, null, 2)}\n`)
                }
              />
            )}
            {activeTab === 'groups' && (
              <ProgramGroupForms
                view="groups"
                catalog={parsedCatalog}
                selectedId={selectedGroupId}
                onSelect={setSelectedGroupId}
                onChange={(value) =>
                  setText(`${JSON.stringify(value, null, 2)}\n`)
                }
              />
            )}
            {activeTab === 'courses' && (
              <CourseOfferingForms
                catalog={parsedCatalog}
                selectedId={selectedCourseId}
                onSelect={setSelectedCourseId}
                onChange={(value) =>
                  setText(`${JSON.stringify(value, null, 2)}\n`)
                }
              />
            )}
          </section>

          <details className="json-source">
            <summary>עריכת JSON גולמי</summary>
            <label className="json-editor">
              <span>קטלוג JSON</span>
              <textarea
                dir="ltr"
                spellCheck={false}
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </label>
          </details>
        </>
      )}
    </main>
  );
}
