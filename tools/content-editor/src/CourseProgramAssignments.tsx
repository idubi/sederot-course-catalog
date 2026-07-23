import { useEffect, useState, type KeyboardEvent } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import { setCourseGroupAssignment } from '../catalog-editing';

export function CourseProgramAssignments({
  catalog,
  courseId,
  onChange,
}: {
  catalog: Catalog;
  courseId: string;
  onChange: (value: Catalog) => void;
}) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    catalog.programs[0]?.id ?? null,
  );

  useEffect(() => {
    if (!catalog.programs.some(({ id }) => id === selectedProgramId))
      setSelectedProgramId(catalog.programs[0]?.id ?? null);
  }, [catalog.programs, selectedProgramId]);

  const selectByKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowLeft')
      nextIndex = (currentIndex + 1) % catalog.programs.length;
    else if (event.key === 'ArrowRight')
      nextIndex =
        (currentIndex - 1 + catalog.programs.length) % catalog.programs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = catalog.programs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const next = catalog.programs[nextIndex];
    if (!next) return;
    setSelectedProgramId(next.id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  if (catalog.programs.length === 0)
    return <p>יש להוסיף תוכנית לפני שיוך הקורס לקבוצה.</p>;

  return (
    <fieldset className="assignment-checklist">
      <legend>תוכניות וקבוצות שבהן הקורס מופיע</legend>
      <div
        className="program-assignment-tabs"
        role="tablist"
        aria-label="תוכניות"
      >
        {catalog.programs.map((program, index) => (
          <button
            key={program.id}
            id={`course-${courseId}-program-${program.id}-tab`}
            type="button"
            role="tab"
            aria-controls={`course-${courseId}-program-${program.id}-panel`}
            aria-selected={selectedProgramId === program.id}
            tabIndex={selectedProgramId === program.id ? 0 : -1}
            onClick={() => setSelectedProgramId(program.id)}
            onKeyDown={(event) => selectByKeyboard(event, index)}
          >
            {program.name}
          </button>
        ))}
      </div>
      {catalog.programs
        .filter(({ id }) => id === selectedProgramId)
        .map((program) => (
          <div
            key={program.id}
            id={`course-${courseId}-program-${program.id}-panel`}
            className="program-assignment-panel"
            role="tabpanel"
            aria-labelledby={`course-${courseId}-program-${program.id}-tab`}
          >
            {catalog.audienceGroups
              .filter(({ programId }) => programId === program.id)
              .map((group) => {
                const assigned = catalog.offerings.some(
                  ({ audienceGroupId, courseId: offeringCourseId }) =>
                    offeringCourseId === courseId &&
                    audienceGroupId === group.id,
                );
                return (
                  <label key={group.id}>
                    <input
                      type="checkbox"
                      checked={assigned}
                      onChange={(event) =>
                        onChange(
                          setCourseGroupAssignment(
                            catalog,
                            courseId,
                            group.id,
                            event.target.checked,
                          ),
                        )
                      }
                    />
                    {group.gradeLabels.join('-')} —{' '}
                    {group.gender === 'boys'
                      ? 'בנים'
                      : group.gender === 'girls'
                        ? 'בנות'
                        : 'מעורב'}
                  </label>
                );
              })}
            {!catalog.audienceGroups.some(
              ({ programId }) => programId === program.id,
            ) && <p>אין קבוצות בתוכנית זו.</p>}
          </div>
        ))}
    </fieldset>
  );
}
