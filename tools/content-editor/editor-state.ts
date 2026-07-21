export const EDITOR_STORAGE_KEY = 'sderot-content-editor.catalog';

type EditorStorage = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>;

export function loadEditorText(storage: EditorStorage): string {
  return storage.getItem(EDITOR_STORAGE_KEY) ?? '';
}

export function persistEditorText(storage: EditorStorage, text: string): void {
  if (text) storage.setItem(EDITOR_STORAGE_KEY, text);
  else storage.removeItem(EDITOR_STORAGE_KEY);
}

export function resetEditorState(storage: EditorStorage): void {
  storage.removeItem(EDITOR_STORAGE_KEY);
}
