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
  resolveRegistrationTarget,
  setAudienceGroupRegistrationUrl,
  setProgramRegistrationUrl,
  updateAudienceGroup,
  updateProgram,
} from '../catalog-editing';
import { EntityBrowser } from './EntityBrowser';

export function ProgramGroupForms({
  catalog,
  onChange,
  onSelect,
  selectedId,
  view,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
  view: 'groups' | 'programs';
}) {
  const program = (id: string, patch: Partial<Program>) => {
    const value = catalog.programs.find((item) => item.id === id);
    if (value) {
      onChange(updateProgram(catalog, id, { ...value, ...patch }));
      if (patch.id !== undefined) onSelect(patch.id);
    }
  };
  const group = (id: string, patch: Partial<AudienceGroup>) => {
    const value = catalog.audienceGroups.find((item) => item.id === id);
    if (value) {
      onChange(updateAudienceGroup(catalog, id, { ...value, ...patch }));
      if (patch.id !== undefined) onSelect(patch.id);
    }
  };
  return (
    <section className="structured-editor">
      <h2>{view === 'programs' ? 'תוכניות' : 'קבוצות קהל'}</h2>
      <div className="entity-master-detail">
        <EntityBrowser
          entityLabel={view === 'programs' ? 'התוכניות' : 'הקבוצות'}
          items={
            view === 'programs'
              ? catalog.programs.map(({ id, name }) => ({
                  id,
                  label: name,
                  meta: id,
                }))
              : catalog.audienceGroups.map((value) => ({
                  id: value.id,
                  label: value.gradeLabels.join(', ') || value.id,
                  meta:
                    catalog.programs.find(({ id }) => id === value.programId)
                      ?.name ?? value.programId,
                }))
          }
          selectedId={selectedId}
          onSelect={onSelect}
        />
        <div className="entity-detail">
          {view === 'programs' &&
            catalog.programs
              .filter(({ id }) => id === selectedId)
              .map((value) => (
                <fieldset key={value.id} id={`program-${value.id}`}>
                  <legend>{value.name}</legend>
                  <label>
                    מזהה
                    <input
                      dir="ltr"
                      value={value.id}
                      onChange={(e) =>
                        program(value.id, { id: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    שם
                    <input
                      value={value.name}
                      onChange={(e) =>
                        program(value.id, { name: e.target.value })
                      }
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
                    כתובת סליקה/רישום של התוכנית
                    <input
                      dir="ltr"
                      type="url"
                      inputMode="url"
                      placeholder="https://"
                      value={
                        catalog.registrationTargets.find(
                          ({ id }) => id === value.defaultRegistrationTargetId,
                        )?.url ?? ''
                      }
                      onChange={(event) =>
                        onChange(
                          setProgramRegistrationUrl(
                            catalog,
                            value.id,
                            event.target.value,
                          ),
                        )
                      }
                    />
                  </label>
                  <small>
                    אפשר להזין כתובת HTTPS של כל שירות חיצוני. ללא כתובת, האימות
                    והייצוא ייחסמו.
                  </small>
                  <label>
                    מידע לפני רישום (HTML)
                    <textarea
                      rows={8}
                      placeholder="<p>תנאי קבלה, נוהל תשלום ופרטי צוות...</p>"
                      value={value.registrationInfoHtml ?? ''}
                      onChange={(event) =>
                        program(value.id, {
                          registrationInfoHtml: event.target.value || undefined,
                        })
                      }
                    />
                  </label>
                  <small>
                    המידע יוצג לפני המעבר לשירות הרישום או הסליקה החיצוני.
                  </small>
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
                    onClick={() => {
                      const index = catalog.programs.findIndex(
                        ({ id }) => id === value.id,
                      );
                      const neighbor =
                        catalog.programs[index + 1] ??
                        catalog.programs[index - 1];
                      onSelect(neighbor?.id ?? '');
                      onChange(removeProgram(catalog, value.id));
                    }}
                  >
                    מחיקת תוכנית
                  </button>
                </fieldset>
              ))}
          {view === 'programs' && (
            <button
              type="button"
              onClick={() => {
                const next = addProgram(catalog);
                onChange(next);
                onSelect(next.programs.at(-1)?.id ?? '');
              }}
            >
              + הוספת תוכנית
            </button>
          )}
          {view === 'groups' &&
            catalog.audienceGroups
              .filter(({ id }) => id === selectedId)
              .map((value) => {
                const index = catalog.audienceGroups.findIndex(
                  ({ id }) => id === value.id,
                );
                return (
                  <fieldset key={value.id} id={`group-${value.id}`}>
                    <legend>קבוצה {index + 1}</legend>
                    <label>
                      מזהה
                      <input
                        dir="ltr"
                        value={value.id}
                        onChange={(e) =>
                          group(value.id, { id: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      תוכנית
                      <select
                        value={value.programId}
                        onChange={(e) =>
                          group(value.id, { programId: e.target.value })
                        }
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
                          group(value.id, {
                            gradeLabels: grades,
                            gradeValues: grades,
                          });
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
                        onChange={(e) =>
                          group(value.id, { day: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      התחלה
                      <input
                        type="time"
                        value={value.startTime}
                        onChange={(e) =>
                          group(value.id, { startTime: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      סיום
                      <input
                        type="time"
                        value={value.endTime}
                        onChange={(e) =>
                          group(value.id, { endTime: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      כתובת סליקה/רישום ייעודית לקבוצה
                      <input
                        dir="ltr"
                        type="url"
                        inputMode="url"
                        placeholder="https:// (רשות)"
                        value={
                          catalog.registrationTargets.find(
                            ({ id }) => id === value.registrationTargetId,
                          )?.url ?? ''
                        }
                        onChange={(event) =>
                          onChange(
                            setAudienceGroupRegistrationUrl(
                              catalog,
                              value.id,
                              event.target.value,
                            ),
                          )
                        }
                      />
                    </label>
                    <small>
                      שדה ריק משתמש בכתובת התוכנית. הכתובת האפקטיבית:{' '}
                      <bdi dir="ltr">
                        {resolveRegistrationTarget(catalog, value.id)?.url ??
                          'חסרה'}
                      </bdi>
                    </small>
                    <label>
                      מידע ייעודי לפני רישום לקבוצה (HTML)
                      <textarea
                        rows={8}
                        placeholder="שדה ריק יורש את מידע התוכנית"
                        value={value.registrationInfoHtml ?? ''}
                        onChange={(event) =>
                          group(value.id, {
                            registrationInfoHtml:
                              event.target.value || undefined,
                          })
                        }
                      />
                    </label>
                    <small>
                      {value.registrationInfoHtml
                        ? 'הקבוצה משתמשת במידע הייעודי שלה.'
                        : catalog.programs.find(
                              ({ id }) => id === value.programId,
                            )?.registrationInfoHtml
                          ? 'השדה ריק ולכן יוצג המידע של תוכנית האם.'
                          : 'השדה והתוכנית ריקים ולכן יוצג נוסח הבטיחות המובנה.'}
                    </small>
                    <div>
                      <strong>קורסים המשויכים לקבוצה</strong>
                      <p>
                        [
                        {catalog.offerings
                          .filter(
                            ({ audienceGroupId }) =>
                              audienceGroupId === value.id,
                          )
                          .sort(
                            (left, right) =>
                              left.displayOrder - right.displayOrder,
                          )
                          .map(
                            (offering) =>
                              catalog.courses.find(
                                ({ id }) => id === offering.courseId,
                              )?.name ?? offering.courseId,
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
                      onClick={() => {
                        const neighbor =
                          catalog.audienceGroups[index + 1] ??
                          catalog.audienceGroups[index - 1];
                        onSelect(neighbor?.id ?? '');
                        onChange(removeAudienceGroup(catalog, value.id));
                      }}
                    >
                      מחיקת קבוצה
                    </button>
                  </fieldset>
                );
              })}
          {view === 'groups' && (
            <button
              type="button"
              onClick={() => {
                const next = addAudienceGroup(catalog);
                onChange(next);
                onSelect(next.audienceGroups.at(-1)?.id ?? '');
              }}
            >
              + הוספת קבוצה
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
