# קטלוג התוכניות והקורסים — מרכז המצוינות שדרות

אתר קטלוג סטטי בעברית ובכיווניות RTL, המיועד לבחירת תוכנית, שכבה וקבוצת קהל לפני צפייה באשכול הקורסים המתאים.

## מצב הפרויקט

TASK-003 מקים את מעטפת Astro הסטטית. תוכן הקטלוג, מסלול הבחירה, עמודי התוכנית והרישום יתווספו במשימות הייעודיות לפי [`artifacts/DEVELOPMENT_TASKS.md`](artifacts/DEVELOPMENT_TASKS.md).

הקובץ `index.html` בשורש הוא שאלון האפיון העצמאי הקודם ונשמר לעיון. אתר הקטלוג החדש נבנה מתוך `src/` אל `dist/`.

## דרישות פיתוח

- Node.js 22 ומעלה
- npm 10 ומעלה

הגרסאות הנתמכות מוגדרות גם בשדה `engines` של `package.json`, ותלויות הפיתוח נעולות ב-`package-lock.json`.

## הפעלה

```bash
npm install
npm run dev
```

שרת הפיתוח נקשר ל-`127.0.0.1` בלבד כברירת מחדל.

## בנייה סטטית

```bash
npm run build
```

התוצר נכתב ל-`dist/`. מעטפת TASK-003 כוללת CSS מוטמע וללא JavaScript או API בזמן ריצה, ולכן ניתן לפתוח את `dist/index.html` ישירות בדפדפן לצורך בדיקת המעטפת.

עמודים מקוננים עתידיים וקישורים ביניהם ייבדקו דרך אירוח HTTP סטטי, מפני שניווט רב-עמודי אינו אמין בפרוטוקול `file://` בכל הדפדפנים.

## GitHub Pages ותת-נתיב

הגדרת `PUBLIC_BASE_PATH` מאפשרת לבנות תחת נתיב repository בלי לשנות את הקוד:

```bash
PUBLIC_BASE_PATH=/sderot-course-catalog/ npm run build
```

לאתר בדומיין או בתת-דומיין עצמאי אין צורך בערך נוסף; ברירת המחדל היא `/`. הפריסה עצמה תוגדר במשימות השחרור.

## בדיקות איכות

```bash
npm run typecheck     # בדיקת TypeScript ו-Astro במצב strictest
npm run lint          # ESLint לקובצי TypeScript/Astro + אימות Prettier
npm run test          # בדיקות Vitest דטרמיניסטיות (גם לפני הוספת קובצי test)
npm run format:check  # אימות עיצוב קוד ללא שינוי קבצים
npm run format        # תיקון עיצוב קוד מקומי
npm run check         # שער מקומי מלא: typecheck, lint, tests ו-build
```

`npm run build` מריץ בדיקת טיפוסים לפני יצירת `dist/`, כדי שבנייה לא תצליח כאשר קיימות שגיאות TypeScript. ESLint בודק קובצי JavaScript, TypeScript ו-Astro, ו-Prettier אוכף עיצוב דטרמיניסטי. קובצי build, תלויות, מסמכי מקור וה-HTML הישן מוחרגים במפורש.

## עקרונות קבועים

- עברית, RTL ו-Mobile First
- תוצר סטטי ללא Backend, מסד נתונים, Authentication או Analytics
- JSON מאושר יהיה מקור התוכן היחיד של אתר הייצור
- הרישום שייך לתוכנית/קבוצה, לא לקורס בודד
- מסך מידע פנימי יוצג לפני קישור רישום או תשלום חיצוני
