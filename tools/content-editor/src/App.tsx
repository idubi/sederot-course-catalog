import { useEffect, useMemo, useState } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogShapeMessage,
  formatImportedJson,
  isEditableCatalog,
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
      setText(formatImportedJson(await file.text()));
      setMessage({ kind: 'success', text: `הקובץ ${file.name} נטען מהכונן` });
    } catch {
      setMessage({ kind: 'error', text: 'הקובץ שנבחר אינו JSON תקין' });
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
    setAcknowledgeWarnings(false);
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
