import { describe, expect, it, vi } from 'vitest';

import {
  EDITOR_STORAGE_KEY,
  loadEditorText,
  persistEditorText,
  resetEditorState,
} from './editor-state';

function storage(value: string | null = null) {
  return {
    getItem: vi.fn(() => value),
    removeItem: vi.fn(),
    setItem: vi.fn(),
  };
}

describe('editor browser state', () => {
  it('loads the autosaved catalog', () => {
    expect(loadEditorText(storage('{"saved":true}'))).toBe('{"saved":true}');
  });

  it('persists content and removes empty state', () => {
    const target = storage();
    persistEditorText(target, '{"saved":true}');
    expect(target.setItem).toHaveBeenCalledWith(
      EDITOR_STORAGE_KEY,
      '{"saved":true}',
    );

    persistEditorText(target, '');
    expect(target.removeItem).toHaveBeenCalledWith(EDITOR_STORAGE_KEY);
  });

  it('resets only the editor storage key', () => {
    const target = storage();
    resetEditorState(target);
    expect(target.removeItem).toHaveBeenCalledWith(EDITOR_STORAGE_KEY);
    expect(target.setItem).not.toHaveBeenCalled();
  });
});
