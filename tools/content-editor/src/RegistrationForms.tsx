import { useState } from 'react';

import type {
  AudienceGroup,
  Catalog,
  Program,
  RegistrationTarget,
} from '../../../src/domain/catalog';
import {
  resolveRegistrationTarget,
  updateAudienceGroup,
  updateProgram,
  updateRegistrationTarget,
} from '../catalog-editing';

export function RegistrationForms({
  catalog,
  onChange,
}: {
  catalog: Catalog;
  onChange: (value: Catalog) => void;
}) {
  const [previewGroupId, setPreviewGroupId] = useState(
    catalog.audienceGroups[0]?.id ?? '',
  );
  const previewGroup = catalog.audienceGroups.find(
    ({ id }) => id === previewGroupId,
  );
  const previewProgram = catalog.programs.find(
    ({ id }) => id === previewGroup?.programId,
  );
  const previewTarget = resolveRegistrationTarget(catalog, previewGroupId);

  const target = (id: string, patch: Partial<RegistrationTarget>) => {
    const value = catalog.registrationTargets.find((item) => item.id === id);
    if (value)
      onChange(updateRegistrationTarget(catalog, id, { ...value, ...patch }));
  };
  const program = (id: string, targetId: string) => {
    const value = catalog.programs.find((item) => item.id === id);
    if (!value) return;
    const update: Program = { ...value };
    if (targetId) update.defaultRegistrationTargetId = targetId;
    else delete update.defaultRegistrationTargetId;
    onChange(updateProgram(catalog, id, update));
  };
  const group = (id: string, targetId: string) => {
    const value = catalog.audienceGroups.find((item) => item.id === id);
    if (!value) return;
    const update: AudienceGroup = { ...value };
    if (targetId) update.registrationTargetId = targetId;
    else delete update.registrationTargetId;
    onChange(updateAudienceGroup(catalog, id, update));
  };

  return (
    <section className="structured-editor">
      <h2>מידע ויעדי רישום</h2>
      <p>
        היעד של הקבוצה קודם לברירת המחדל של התוכנית. הקישור החיצוני מוצג רק לאחר
        כרטיסיית המידע, ולעולם אינו משויך לקורס.
      </p>

      {catalog.registrationTargets.map((value) => (
        <fieldset key={value.id}>
          <legend>{value.label}</legend>
          <label>
            מזהה יעד
            <input
              dir="ltr"
              value={value.id}
              onChange={(event) => target(value.id, { id: event.target.value })}
            />
          </label>
          <label>
            סוג
            <input
              value={value.type}
              onChange={(event) =>
                target(value.id, { type: event.target.value })
              }
            />
          </label>
          <label>
            טקסט מידע ופעולה
            <input
              value={value.label}
              onChange={(event) =>
                target(value.id, { label: event.target.value })
              }
            />
          </label>
          <label>
            כתובת רישום מאובטחת
            <input
              dir="ltr"
              type="url"
              inputMode="url"
              placeholder="https://"
              value={value.url}
              onChange={(event) =>
                target(value.id, { url: event.target.value })
              }
            />
          </label>
          <label className="inline-check">
            <input
              type="checkbox"
              checked={value.enabled}
              onChange={(event) =>
                target(value.id, { enabled: event.target.checked })
              }
            />
            יעד פעיל
          </label>
        </fieldset>
      ))}

      <fieldset>
        <legend>ברירות מחדל לתוכניות</legend>
        {catalog.programs.map((value) => (
          <label key={value.id}>
            {value.name}
            <select
              value={value.defaultRegistrationTargetId ?? ''}
              onChange={(event) => program(value.id, event.target.value)}
            >
              <option value="">ללא ברירת מחדל</option>
              {catalog.registrationTargets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} {item.enabled ? '' : '(לא פעיל)'}
                </option>
              ))}
            </select>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>יעדים ייעודיים לקבוצות</legend>
        {catalog.audienceGroups.map((value) => (
          <label key={value.id}>
            {value.gradeLabels.join(', ')} — {value.gender}
            <select
              value={value.registrationTargetId ?? ''}
              onChange={(event) => group(value.id, event.target.value)}
            >
              <option value="">שימוש בברירת המחדל של התוכנית</option>
              {catalog.registrationTargets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} {item.enabled ? '' : '(לא פעיל)'}
                </option>
              ))}
            </select>
          </label>
        ))}
      </fieldset>

      <fieldset className="registration-preview">
        <legend>תצוגה מקדימה של מידע הרישום</legend>
        <label>
          קבוצה לתצוגה
          <select
            value={previewGroupId}
            onChange={(event) => setPreviewGroupId(event.target.value)}
          >
            {catalog.audienceGroups.map((value) => (
              <option key={value.id} value={value.id}>
                {
                  catalog.programs.find(({ id }) => id === value.programId)
                    ?.name
                }{' '}
                — {value.gradeLabels.join(', ')} — {value.gender}
              </option>
            ))}
          </select>
        </label>
        {previewGroup && previewProgram && previewTarget ? (
          <article>
            <p className="eyebrow">מידע לפני מעבר לאתר חיצוני</p>
            <h3>רישום לתוכנית {previewProgram.name}</h3>
            <p>
              {previewGroup.gradeLabels.join(', ')} — {previewTarget.label}
            </p>
            <p dir="ltr">{previewTarget.url}</p>
            {!previewTarget.enabled && (
              <p className="preview-warning">היעד אינו פעיל וייחסם באימות.</p>
            )}
          </article>
        ) : (
          <p className="preview-warning">
            לא נמצא יעד אפקטיבי. האימות יחסום ייצוא עד שיוגדר יעד תקין.
          </p>
        )}
      </fieldset>
    </section>
  );
}
