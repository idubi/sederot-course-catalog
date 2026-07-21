import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sderot-content-editor.catalog';

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
  const [text, setText] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? '',
  );
  const [message, setMessage] = useState<Message>(null);
  const [acknowledgeWarnings, setAcknowledgeWarnings] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => localStorage.setItem(STORAGE_KEY, text),
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
      </div>

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
