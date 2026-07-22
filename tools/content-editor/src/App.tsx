import { useEffect, useMemo, useState } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogShapeMessage,
  formatImportedJson,
  isEditableCatalog,
  isLegacyCatalog,
  validateWebCatalogUrl,
} from '../catalog-import';
import {
  loadEditorText,
  persistEditorText,
  resetEditorState,
} from '../editor-state';
import { CourseOfferingForms } from './CourseOfferingForms';
import { ProgramGroupForms } from './ProgramGroupForms';
import { RegistrationForms } from './RegistrationForms';

type Message = { kind: 'error' | 'success'; text: string } | null;
type ImportDiagnostic = {
  code: string;
  message: string;
  path: PropertyKey[];
  severity: 'error' | 'warning' | 'info';
};

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
  const [text, setText] = useState(() => loadEditorText(localStorage));
  const [message, setMessage] = useState<Message>(null);
  const [acknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [webCatalogUrl, setWebCatalogUrl] = useState('');
  const [bootstrapFolder, setBootstrapFolder] = useState('');
  const [importDiagnostics, setImportDiagnostics] = useState<
    ImportDiagnostic[]
  >([]);
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

  useEffect(() => {
    const timer = window.setTimeout(
      () => persistEditorText(localStorage, text),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [text]);

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

  async function loadDocument(file: File | undefined) {
    if (!file) return;
    try {
      const result = await requestJson('/api/import-document', {
        method: 'POST',
        body: JSON.stringify({
          fileName: file.name,
          source: await file.text(),
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

  async function loadFromWeb() {
    try {
      const url = validateWebCatalogUrl(webCatalogUrl.trim());
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setText(formatImportedJson(await response.text()));
      setMessage({ kind: 'success', text: 'קובץ ה-JSON נטען מהאינטרנט' });
    } catch (error) {
      setMessage({
        kind: 'error',
        text:
          error instanceof Error
            ? `טעינה מהאינטרנט נכשלה: ${error.message}`
            : 'טעינה מהאינטרנט נכשלה',
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
          warnings: [],
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
          warnings: importDiagnostics.map(({ message }) => message),
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
    setWebCatalogUrl('');
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

      <div className="toolbar" aria-label="פעולות קובץ">
        <button type="button" onClick={() => void load('approved')}>
          טעינת מאושר
        </button>
        <button type="button" onClick={() => void load('draft')}>
          טעינת טיוטה
        </button>
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

      <section className="import-panel" aria-labelledby="import-title">
        <h2 id="import-title">טעינת קובץ JSON</h2>
        <label>
          מהמחשב או מכונן מסונכרן
          <input
            type="file"
            accept="application/json,.json"
            onChange={(event) => void loadFile(event.target.files?.[0])}
          />
        </label>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void loadFromWeb();
          }}
        >
          <label>
            מכתובת אינטרנט מאובטחת
            <input
              dir="ltr"
              type="url"
              inputMode="url"
              required
              placeholder="https://example.org/catalog.json"
              value={webCatalogUrl}
              onChange={(event) => setWebCatalogUrl(event.target.value)}
            />
          </label>
          <button type="submit">טעינה מהאינטרנט</button>
        </form>
        <p>
          האתר המארח חייב לאפשר גישת CORS. טעינת הקובץ מחליפה את הטקסט בעורך
          בלבד; כתיבה לכונן מתבצעת רק בשמירת טיוטה או בייצוא מפורש.
        </p>
      </section>

      <section className="import-panel" aria-labelledby="document-title">
        <h2 id="document-title">יצירת JSON ממסמך Blueprint</h2>
        <label>
          מסמך Markdown או טקסט
          <input
            type="file"
            accept="text/markdown,text/plain,.md,.txt"
            onChange={(event) => void loadDocument(event.target.files?.[0])}
          />
        </label>
        <p>
          הטקסט מומר לטיוטה הקרובה ביותר. תוכן חסר או לא ודאי נשאר כאבחון לעריכה
          לפני ייצוא.
        </p>
      </section>

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
        <p>הייצוא דורש Schema תקין ואישור אזהרות. הוא אינו משנה תוכן מאושר.</p>
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
          <p>יש לפתור את כל השגיאות לפני ייצוא תוכן מאושר.</p>
          <ul>
            {importDiagnostics.map((diagnostic, index) => (
              <li key={`${diagnostic.code}-${index}`}>
                <strong>
                  {diagnostic.severity === 'error'
                    ? 'שגיאה'
                    : diagnostic.severity === 'warning'
                      ? 'אזהרה'
                      : 'מידע'}
                  :
                </strong>{' '}
                {diagnostic.message} <code>{diagnostic.path.join('.')}</code>
              </li>
            ))}
          </ul>
        </details>
      )}

      {parsedCatalog && (
        <>
          <ProgramGroupForms
            catalog={parsedCatalog}
            onChange={(value) => setText(`${JSON.stringify(value, null, 2)}\n`)}
          />
          <CourseOfferingForms
            catalog={parsedCatalog}
            onChange={(value) => setText(`${JSON.stringify(value, null, 2)}\n`)}
          />
          <RegistrationForms
            catalog={parsedCatalog}
            onChange={(value) => setText(`${JSON.stringify(value, null, 2)}\n`)}
          />
        </>
      )}

      <label className="json-editor">
        <span>קטלוג JSON</span>
        <textarea
          dir="ltr"
          spellCheck={false}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
    </main>
  );
}
