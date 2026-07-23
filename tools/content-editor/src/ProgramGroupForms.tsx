import type {
  AudienceGroup,
  Catalog,
  Program,
} from '../../../src/domain/catalog';
import {
  moveAudienceGroup,
  updateAudienceGroup,
  updateProgram,
} from '../catalog-editing';

export function ProgramGroupForms({
  catalog,
  onChange,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
}) {
  const program = (id: string, patch: Partial<Program>) => {
    const value = catalog.programs.find((item) => item.id === id);
    if (value) onChange(updateProgram(catalog, id, { ...value, ...patch }));
  };
  const group = (id: string, patch: Partial<AudienceGroup>) => {
    const value = catalog.audienceGroups.find((item) => item.id === id);
    if (value)
      onChange(updateAudienceGroup(catalog, id, { ...value, ...patch }));
  };
  return (
    <section className="structured-editor">
      <h2>תוכניות וקבוצות קהל</h2>
      {catalog.programs.map((value) => (
        <fieldset key={value.id}>
          <legend>{value.name}</legend>
          <label>
            מזהה
            <input
              dir="ltr"
              value={value.id}
              onChange={(e) => program(value.id, { id: e.target.value })}
            />
          </label>
          <label>
            שם
            <input
              value={value.name}
              onChange={(e) => program(value.id, { name: e.target.value })}
            />
          </label>
          <label>
            מסלול
            <select
              value={value.category}
              onChange={(e) =>
                program(value.id, {
                  category: e.target.value as Program['category'],
                })
              }
            >
              <option value="gifted">מחוננים</option>
              <option value="excellence">מצטיינים</option>
            </select>
          </label>
          <div>
            <strong>קורסים בתוכנית</strong>
            <ul>
              {catalog.courses
                .filter((course) =>
                  catalog.offerings.some(
                    (offering) =>
                      offering.courseId === course.id &&
                      catalog.audienceGroups.some(
                        (groupValue) =>
                          groupValue.id === offering.audienceGroupId &&
                          groupValue.programId === value.id,
                      ),
                  ),
                )
                .map((course) => (
                  <li key={course.id}>{course.name}</li>
                ))}
            </ul>
          </div>
        </fieldset>
      ))}
      {catalog.audienceGroups.map((value, index) => (
        <fieldset key={value.id}>
          <legend>קבוצה {index + 1}</legend>
          <label>
            מזהה
            <input
              dir="ltr"
              value={value.id}
              onChange={(e) => group(value.id, { id: e.target.value })}
            />
          </label>
          <label>
            תוכנית
            <select
              value={value.programId}
              onChange={(e) => group(value.id, { programId: e.target.value })}
            >
              {catalog.programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            שכבות
            <input
              value={value.gradeLabels.join(', ')}
              onChange={(e) => {
                const grades = e.target.value
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean);
                group(value.id, { gradeLabels: grades, gradeValues: grades });
              }}
            />
          </label>
          <label>
            קהל
            <select
              value={value.gender}
              onChange={(e) =>
                group(value.id, {
                  gender: e.target.value as AudienceGroup['gender'],
                })
              }
            >
              <option value="boys">בנים</option>
              <option value="girls">בנות</option>
              <option value="mixed">מעורב</option>
            </select>
          </label>
          <label>
            יום
            <input
              value={value.day}
              onChange={(e) => group(value.id, { day: e.target.value })}
            />
          </label>
          <label>
            התחלה
            <input
              type="time"
              value={value.startTime}
              onChange={(e) => group(value.id, { startTime: e.target.value })}
            />
          </label>
          <label>
            סיום
            <input
              type="time"
              value={value.endTime}
              onChange={(e) => group(value.id, { endTime: e.target.value })}
            />
          </label>
          <div>
            <strong>קורסים המשויכים לקבוצה</strong>
            <ul>
              {catalog.offerings
                .filter(({ audienceGroupId }) => audienceGroupId === value.id)
                .sort((left, right) => left.displayOrder - right.displayOrder)
                .map((offering) => (
                  <li key={offering.id}>
                    {catalog.courses.find(({ id }) => id === offering.courseId)
                      ?.name ?? offering.courseId}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => onChange(moveAudienceGroup(catalog, value.id, -1))}
            >
              למעלה
            </button>
            <button
              type="button"
              disabled={index === catalog.audienceGroups.length - 1}
              onClick={() => onChange(moveAudienceGroup(catalog, value.id, 1))}
            >
              למטה
            </button>
          </div>
        </fieldset>
      ))}
    </section>
  );
}
