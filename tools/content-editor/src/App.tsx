import { useEffect, useState } from 'react';

type ApiState = 'checking' | 'ready' | 'unavailable';

const futureSections = [
  'תוכניות וקבוצות קהל',
  'קורסים ושיוכים',
  'פרטי רישום לתוכנית',
  'תמונות ותצוגה מקדימה',
];

export function App() {
  const [apiState, setApiState] = useState<ApiState>('checking');

  useEffect(() => {
    const controller = new AbortController();

    void fetch('/api/health', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then((response) => {
        setApiState(response.ok ? 'ready' : 'unavailable');
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setApiState('unavailable');
        }
      });

    return () => controller.abort();
  }, []);

  const apiLabel = {
    checking: 'בודק חיבור מקומי…',
    ready: 'החיבור המקומי פעיל',
    unavailable: 'החיבור המקומי אינו זמין',
  }[apiState];

  return (
    <main className="editor-shell">
      <header className="editor-header">
        <div>
          <p className="eyebrow">כלי פיתוח מקומי בלבד</p>
          <h1>עורך התוכן</h1>
          <p>מרכז המצוינות שדרות</p>
        </div>
        <span className={`api-state api-state--${apiState}`} role="status">
          {apiLabel}
        </span>
      </header>

      <section className="notice" aria-labelledby="editor-boundary-title">
        <h2 id="editor-boundary-title">סביבת עבודה מוגנת</h2>
        <p>
          העורך זמין רק במחשב המקומי. הוא אינו חלק מאתר הקטלוג הציבורי ואינו
          שולח נתונים לשירות חיצוני.
        </p>
      </section>

      <section aria-labelledby="editor-sections-title">
        <h2 id="editor-sections-title">אזורי עריכה</h2>
        <div className="section-grid">
          {futureSections.map((section) => (
            <article className="section-card" key={section}>
              <h3>{section}</h3>
              <p>יופעל במשימת העריכה הייעודית.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
