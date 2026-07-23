export function EntityBrowser({
  entityLabel,
  items,
  onSelect,
  selectedId,
}: {
  entityLabel: string;
  items: Array<{ id: string; label: string; meta?: string }>;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  return (
    <nav className="entity-browser" aria-label={`דפדפן ${entityLabel}`}>
      <h3>כל {entityLabel}</h3>
      <p>{items.length} פריטים</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={selectedId === item.id ? 'true' : undefined}
              onClick={() => onSelect(item.id)}
            >
              <span>{item.label}</span>
              {item.meta && <small>{item.meta}</small>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
