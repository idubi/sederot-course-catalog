import type {
  Catalog,
  Course,
  CourseOffering,
} from '../../../src/domain/catalog';
import {
  reorderOffering,
  updateCourse,
  updateOffering,
} from '../catalog-editing';

export function CourseOfferingForms({
  catalog,
  onChange,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
}) {
  const courseImage = (value: Course, src: string, alt: string): Course => {
    const rest = { ...value };
    delete rest.defaultImage;
    return src.trim() ? { ...rest, defaultImage: { src, alt } } : rest;
  };
  const offeringImage = (
    value: CourseOffering,
    src: string,
    alt: string,
  ): CourseOffering => {
    const rest = { ...value };
    delete rest.imageOverride;
    return src.trim() ? { ...rest, imageOverride: { src, alt } } : rest;
  };
  const course = (id: string, patch: Partial<Course>) => {
    const value = catalog.courses.find((item) => item.id === id);
    if (value) onChange(updateCourse(catalog, id, { ...value, ...patch }));
  };
  const offering = (id: string, patch: Partial<CourseOffering>) => {
    const value = catalog.offerings.find((item) => item.id === id);
    if (value) onChange(updateOffering(catalog, id, { ...value, ...patch }));
  };
  return (
    <section className="structured-editor">
      <h2>קורסים ושיוכים לקבוצות</h2>
      {catalog.courses.map((value) => (
        <fieldset key={value.id}>
          <legend>{value.name}</legend>
          <label>
            מזהה
            <input
              dir="ltr"
              value={value.id}
              onChange={(e) => course(value.id, { id: e.target.value })}
            />
          </label>
          <label>
            שם
            <input
              value={value.name}
              onChange={(e) => course(value.id, { name: e.target.value })}
            />
          </label>
          <label>
            שם קצר
            <input
              value={value.shortName}
              onChange={(e) => course(value.id, { shortName: e.target.value })}
            />
          </label>
          <label>
            מנחים
            <input
              value={value.instructors.join(', ')}
              onChange={(e) =>
                course(value.id, {
                  instructors: e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
          <label>
            תיאור HTML
            <textarea
              dir="rtl"
              value={value.descriptionHtml}
              onChange={(e) =>
                course(value.id, { descriptionHtml: e.target.value })
              }
            />
          </label>
          <label>
            נתיב תמונה כללית
            <input
              dir="ltr"
              value={value.defaultImage?.src ?? ''}
              onChange={(e) =>
                onChange(
                  updateCourse(
                    catalog,
                    value.id,
                    courseImage(
                      value,
                      e.target.value,
                      value.defaultImage?.alt ?? '',
                    ),
                  ),
                )
              }
            />
          </label>
          <label>
            טקסט חלופי לתמונה
            <input
              value={value.defaultImage?.alt ?? ''}
              onChange={(e) =>
                onChange(
                  updateCourse(
                    catalog,
                    value.id,
                    courseImage(
                      value,
                      value.defaultImage?.src ?? '',
                      e.target.value,
                    ),
                  ),
                )
              }
            />
          </label>
        </fieldset>
      ))}
      {catalog.offerings.map((value) => (
        <fieldset key={value.id}>
          <legend>
            שיוך:{' '}
            {catalog.courses.find(({ id }) => id === value.courseId)?.name ??
              value.courseId}
          </legend>
          <label>
            מזהה
            <input
              dir="ltr"
              value={value.id}
              onChange={(e) => offering(value.id, { id: e.target.value })}
            />
          </label>
          <label>
            קורס
            <select
              value={value.courseId}
              onChange={(e) => offering(value.id, { courseId: e.target.value })}
            >
              {catalog.courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            קבוצת קהל
            <select
              value={value.audienceGroupId}
              onChange={(e) =>
                offering(value.id, { audienceGroupId: e.target.value })
              }
            >
              {catalog.audienceGroups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.gradeLabels.join(', ')} — {item.gender}
                </option>
              ))}
            </select>
          </label>
          <label>
            מחצית
            <select
              value={value.semester}
              onChange={(e) =>
                offering(value.id, {
                  semester: e.target.value as CourseOffering['semester'],
                })
              }
            >
              <option value="annual">שנתי</option>
              <option value="first">מחצית א׳</option>
              <option value="second">מחצית ב׳</option>
            </select>
          </label>
          <label>
            סדר
            <input
              type="number"
              min="0"
              value={value.displayOrder}
              onChange={(e) =>
                offering(value.id, { displayOrder: Number(e.target.value) })
              }
            />
          </label>
          <label>
            נתיב תמונה חלופית לשיוך
            <input
              dir="ltr"
              value={value.imageOverride?.src ?? ''}
              onChange={(e) =>
                onChange(
                  updateOffering(
                    catalog,
                    value.id,
                    offeringImage(
                      value,
                      e.target.value,
                      value.imageOverride?.alt ?? '',
                    ),
                  ),
                )
              }
            />
          </label>
          <label>
            טקסט חלופי לתמונה החלופית
            <input
              value={value.imageOverride?.alt ?? ''}
              onChange={(e) =>
                onChange(
                  updateOffering(
                    catalog,
                    value.id,
                    offeringImage(
                      value,
                      value.imageOverride?.src ?? '',
                      e.target.value,
                    ),
                  ),
                )
              }
            />
          </label>
          <div>
            <button
              type="button"
              onClick={() => onChange(reorderOffering(catalog, value.id, -1))}
            >
              למעלה בקבוצה
            </button>
            <button
              type="button"
              onClick={() => onChange(reorderOffering(catalog, value.id, 1))}
            >
              למטה בקבוצה
            </button>
          </div>
        </fieldset>
      ))}
    </section>
  );
}
