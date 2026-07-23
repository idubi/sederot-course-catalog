import { useEffect, useMemo, useRef, useState } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogObjects,
  catalogReferences,
  jsonCollectionLabels,
  jsonObjectOffset,
  jsonSelectionAtOffset,
  type JsonCollection,
  type JsonSelection,
} from './json-references';

export function JsonReferenceEditor({
  catalog,
  text,
  onTextChange,
}: {
  catalog: Catalog;
  text: string;
  onTextChange: (value: string) => void;
}) {
  const objects = useMemo(() => catalogObjects(catalog), [catalog]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ignoreScrollUntilRef = useRef(0);
  const [selection, setSelection] = useState<JsonSelection>(() => ({
    collection: objects[0]?.collection ?? 'programs',
    id: objects[0]?.id ?? '',
  }));
  const selected = objects.find(
    ({ collection, id }) =>
      collection === selection.collection && id === selection.id,
  );

  useEffect(() => {
    if (!selected && objects[0])
      setSelection({
        collection: objects[0].collection,
        id: objects[0].id,
      });
  }, [objects, selected]);

  const related = selected ? catalogReferences(catalog, selected) : [];
  const selections = objects.map(({ collection, id }) => ({ collection, id }));

  const syncSelectionAtOffset = (offset: number) => {
    const next = jsonSelectionAtOffset(text, selections, offset);
    if (
      next &&
      (next.collection !== selection.collection || next.id !== selection.id)
    )
      setSelection(next);
  };

  const selectAndReveal = (next: JsonSelection) => {
    setSelection(next);
    const textarea = textareaRef.current;
    const offset = jsonObjectOffset(text, next);
    if (!textarea || offset < 0) return;
    textarea.focus();
    textarea.setSelectionRange(offset, offset);
    ignoreScrollUntilRef.current = performance.now() + 250;
    const line = text.slice(0, offset).split('\n').length - 1;
    const lineHeight =
      Number.parseFloat(getComputedStyle(textarea).lineHeight) || 24;
    textarea.scrollTop = Math.max(
      0,
      line * lineHeight - textarea.clientHeight / 3,
    );
  };

  return (
    <section className="json-workspace" aria-labelledby="json-workspace-title">
      <div className="json-edit-pane">
        <h2 id="json-workspace-title">עריכת JSON ידנית</h2>
        <label className="json-editor">
          <span>קטלוג JSON</span>
          <textarea
            ref={textareaRef}
            dir="ltr"
            spellCheck={false}
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
            onSelect={(event) =>
              syncSelectionAtOffset(event.currentTarget.selectionStart)
            }
            onClick={(event) =>
              syncSelectionAtOffset(event.currentTarget.selectionStart)
            }
            onKeyUp={(event) =>
              syncSelectionAtOffset(event.currentTarget.selectionStart)
            }
            onScroll={(event) => {
              if (performance.now() < ignoreScrollUntilRef.current) return;
              const textarea = event.currentTarget;
              const lineHeight =
                Number.parseFloat(getComputedStyle(textarea).lineHeight) || 24;
              const focusLine = Math.floor(
                (textarea.scrollTop + textarea.clientHeight / 3) / lineHeight,
              );
              const offset = text
                .split('\n')
                .slice(0, focusLine)
                .reduce((total, line) => total + line.length + 1, 0);
              syncSelectionAtOffset(offset);
            }}
          />
        </label>
      </div>

      <aside className="json-reference-pane" aria-labelledby="object-title">
        <h2 id="object-title">אובייקט וקשרים</h2>
        <label>
          בחירת אובייקט
          <select
            dir="ltr"
            value={`${selection.collection}:${selection.id}`}
            onChange={(event) => {
              const [collection, ...id] = event.target.value.split(':');
              selectAndReveal({
                collection: collection as JsonCollection,
                id: id.join(':'),
              });
            }}
          >
            {(Object.keys(jsonCollectionLabels) as JsonCollection[]).map(
              (collection) => (
                <optgroup
                  key={collection}
                  label={jsonCollectionLabels[collection]}
                >
                  {objects
                    .filter((item) => item.collection === collection)
                    .map((item) => (
                      <option
                        key={`${collection}:${item.id}`}
                        value={`${collection}:${item.id}`}
                      >
                        {item.label} ({item.id})
                      </option>
                    ))}
                </optgroup>
              ),
            )}
          </select>
        </label>

        {selected ? (
          <>
            <pre dir="ltr">{JSON.stringify(selected.value, null, 2)}</pre>
            <h3>אובייקטים מקושרים</h3>
            {related.length > 0 ? (
              <ul className="json-reference-links">
                {related.map((reference) => (
                  <li key={`${reference.collection}:${reference.id}`}>
                    <button
                      type="button"
                      onClick={() => selectAndReveal(reference)}
                    >
                      {reference.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>לא נמצאו קשרים לאובייקטים אחרים.</p>
            )}
          </>
        ) : (
          <p>אין אובייקטים זמינים בקטלוג.</p>
        )}
      </aside>
    </section>
  );
}
