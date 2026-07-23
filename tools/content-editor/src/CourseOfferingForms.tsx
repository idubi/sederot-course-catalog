import type {
  Catalog,
  Course,
  CourseOffering,
} from '../../../src/domain/catalog';
import {
  addCourse,
  removeCourse,
  reorderOffering,
  resolveOfferingImage,
  updateCourse,
  updateOffering,
} from '../catalog-editing';
import { CourseProgramAssignments } from './CourseProgramAssignments';
import { EntityBrowser } from './EntityBrowser';

export function CourseOfferingForms({
  catalog,
  onChange,
  onSelect,
  selectedId,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const sanitizeDescription = async (value: string): Promise<string> => {
    const response = await fetch('/api/sanitize-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    const result = (await response.json()) as {
      error?: string;
      value?: string;
    };
    if (!response.ok || typeof result.value !== 'string')
      throw new Error(result.error ?? 'Sanitization failed');
    return result.value;
  };
  const uploadImage = async (
    file: File | undefined,
    entityId: string,
    kind: 'course' | 'offering',
  ) => {
    if (!file) return;
    const dataBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Image read failed'));
      reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
      reader.readAsDataURL(file);
    });
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataBase64, entityId, kind, mimeType: file.type }),
    });
    const result = (await response.json()) as { error?: string; src?: string };
    if (!response.ok || !result.src)
      throw new Error(result.error ?? 'Upload failed');
    return result.src;
  };
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
    if (value) {
      onChange(updateCourse(catalog, id, { ...value, ...patch }));
      if (patch.id !== undefined) onSelect(patch.id);
    }
  };
  const offering = (id: string, patch: Partial<CourseOffering>) => {
    const value = catalog.offerings.find((item) => item.id === id);
    if (value) onChange(updateOffering(catalog, id, { ...value, ...patch }));
  };
  return (
    <section className="structured-editor">
      <h2>קורסים ושיוכים לקבוצות</h2>
      <div className="entity-master-detail">
        <EntityBrowser
          entityLabel="הקורסים"
          items={catalog.courses.map(({ id, name }) => ({
            id,
            label: name,
            meta: id,
          }))}
          selectedId={selectedId}
          onSelect={onSelect}
        />
        <div className="entity-detail">
          {catalog.courses
            .filter(({ id }) => id === selectedId)
            .map((value) => (
              <fieldset key={value.id} id={`course-${value.id}`}>
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
                    onChange={(e) =>
                      course(value.id, { shortName: e.target.value })
                    }
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
                <CourseProgramAssignments
                  catalog={catalog}
                  courseId={value.id}
                  onChange={onChange}
                />
                <label>
                  תיאור HTML
                  <textarea
                    dir="rtl"
                    value={value.descriptionHtml}
                    onChange={(e) =>
                      course(value.id, { descriptionHtml: e.target.value })
                    }
                    onBlur={(e) =>
                      void sanitizeDescription(e.target.value)
                        .then((descriptionHtml) =>
                          course(value.id, { descriptionHtml }),
                        )
                        .catch((error: Error) => window.alert(error.message))
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
                  העלאת תמונה כללית
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                      void uploadImage(
                        event.target.files?.[0],
                        value.id,
                        'course',
                      )
                        .then((src) => {
                          if (src)
                            onChange(
                              updateCourse(
                                catalog,
                                value.id,
                                courseImage(
                                  value,
                                  src,
                                  value.defaultImage?.alt ?? '',
                                ),
                              ),
                            );
                        })
                        .catch((error: Error) => window.alert(error.message))
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
                {value.defaultImage?.src && (
                  <figure className="image-preview">
                    <img
                      src={value.defaultImage.src}
                      alt={value.defaultImage.alt}
                    />
                    <figcaption>
                      {value.defaultImage.alt || 'תמונת הקורס'}
                    </figcaption>
                  </figure>
                )}
                <button
                  className="danger"
                  type="button"
                  onClick={() => {
                    const index = catalog.courses.findIndex(
                      ({ id }) => id === value.id,
                    );
                    const neighbor =
                      catalog.courses[index + 1] ?? catalog.courses[index - 1];
                    onSelect(neighbor?.id ?? '');
                    onChange(removeCourse(catalog, value.id));
                  }}
                >
                  מחיקת קורס
                </button>
              </fieldset>
            ))}
          <button
            type="button"
            onClick={() => {
              const next = addCourse(catalog);
              onChange(next);
              onSelect(next.courses.at(-1)?.id ?? '');
            }}
          >
            + הוספת קורס
          </button>
        </div>
      </div>
      {false &&
        catalog.offerings.map((value) => (
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
                onChange={(e) =>
                  offering(value.id, { courseId: e.target.value })
                }
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
              העלאת תמונה חלופית לשיוך
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                  void uploadImage(
                    event.target.files?.[0],
                    value.id,
                    'offering',
                  )
                    .then((src) => {
                      if (src)
                        onChange(
                          updateOffering(
                            catalog,
                            value.id,
                            offeringImage(
                              value,
                              src,
                              value.imageOverride?.alt ?? '',
                            ),
                          ),
                        );
                    })
                    .catch((error: Error) => window.alert(error.message))
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
            {(() => {
              const course = catalog.courses.find(
                ({ id }) => id === value.courseId,
              );
              const image = course
                ? resolveOfferingImage(course, value)
                : undefined;
              return image ? (
                <figure className="image-preview">
                  <img src={image.src} alt={image.alt} />
                  <figcaption>
                    {value.imageOverride
                      ? 'תמונה ייעודית לשיוך'
                      : 'תמונת ברירת המחדל של הקורס'}
                  </figcaption>
                </figure>
              ) : (
                <p>אין תמונה — זהו מצב תקין.</p>
              );
            })()}
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
