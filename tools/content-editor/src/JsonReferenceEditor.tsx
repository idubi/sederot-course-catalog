import { useEffect, useMemo, useState } from 'react';

import type { Catalog } from '../../../src/domain/catalog';
import {
  catalogObjects,
  catalogReferences,
  jsonCollectionLabels,
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

  return (
    <section className="json-workspace" aria-labelledby="json-workspace-title">
      <div className="json-edit-pane">
        <h2 id="json-workspace-title">עריכת JSON ידנית</h2>
        <label className="json-editor">
          <span>קטלוג JSON</span>
          <textarea
            dir="ltr"
            spellCheck={false}
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
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
              setSelection({
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
                      onClick={() => setSelection(reference)}
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
