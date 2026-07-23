import type {
  AudienceGroup,
  Catalog,
  Program,
} from '../../../src/domain/catalog';
import {
  addAudienceGroup,
  addProgram,
  moveAudienceGroup,
  removeAudienceGroup,
  removeProgram,
  updateAudienceGroup,
  updateProgram,
} from '../catalog-editing';

export function ProgramGroupForms({
  catalog,
  onChange,
  view,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
  view: 'groups' | 'programs';
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
      <h2>{view === 'programs' ? 'תוכניות' : 'קבוצות קהל'}</h2>
      {view === 'programs' &&
        catalog.programs.map((value) => (
          <fieldset key={value.id} id={`program-${value.id}`}>
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
            <label>
              קישור סליקה/רישום ברירת מחדל
              <select
                value={value.defaultRegistrationTargetId ?? ''}
                onChange={(event) => {
                  const update = { ...value };
                  if (event.target.value)
                    update.defaultRegistrationTargetId = event.target.value;
                  else delete update.defaultRegistrationTargetId;
                  program(value.id, update);
                }}
              >
                <option value="">חסר — הייצוא ייחסם</option>
                {catalog.registrationTargets.map((target) => (
                  <option key={target.id} value={target.id}>
                    {target.label} — {target.url}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <strong>קורסים בתוכנית</strong>
              <p>
                [
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
                  .map((course) => course.name)
                  .join(', ')}
                ]
              </p>
            </div>
            <button
              className="danger"
              type="button"
              onClick={() => onChange(removeProgram(catalog, value.id))}
            >
              מחיקת תוכנית
            </button>
          </fieldset>
        ))}
      {view === 'programs' && (
        <button type="button" onClick={() => onChange(addProgram(catalog))}>
          + הוספת תוכנית
        </button>
      )}
      {view === 'groups' &&
        catalog.audienceGroups.map((value, index) => (
          <fieldset key={value.id} id={`group-${value.id}`}>
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
            <label>
              קישור סליקה/רישום לקבוצה
              <select
                value={value.registrationTargetId ?? ''}
                onChange={(event) => {
                  const update = { ...value };
                  if (event.target.value)
                    update.registrationTargetId = event.target.value;
                  else delete update.registrationTargetId;
                  group(value.id, update);
                }}
              >
                <option value="">שימוש בקישור ברירת המחדל של התוכנית</option>
                {catalog.registrationTargets.map((target) => (
                  <option key={target.id} value={target.id}>
                    {target.label} — {target.url}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <strong>קורסים המשויכים לקבוצה</strong>
              <p>
                [
                {catalog.offerings
                  .filter(({ audienceGroupId }) => audienceGroupId === value.id)
                  .sort((left, right) => left.displayOrder - right.displayOrder)
                  .map(
                    (offering) =>
                      catalog.courses.find(({ id }) => id === offering.courseId)
                        ?.name ?? offering.courseId,
                  )
                  .join(', ')}
                ]
              </p>
            </div>
            <div>
              <button
                type="button"
                disabled={index === 0}
                onClick={() =>
                  onChange(moveAudienceGroup(catalog, value.id, -1))
                }
              >
                למעלה
              </button>
              <button
                type="button"
                disabled={index === catalog.audienceGroups.length - 1}
                onClick={() =>
                  onChange(moveAudienceGroup(catalog, value.id, 1))
                }
              >
                למטה
              </button>
            </div>
            <button
              className="danger"
              type="button"
              onClick={() => onChange(removeAudienceGroup(catalog, value.id))}
            >
              מחיקת קבוצה
            </button>
          </fieldset>
        ))}
      {view === 'groups' && (
        <button
          type="button"
          onClick={() => onChange(addAudienceGroup(catalog))}
        >
          + הוספת קבוצה
        </button>
      )}
    </section>
  );
}
