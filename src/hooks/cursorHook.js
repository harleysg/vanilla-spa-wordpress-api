import { updateCursor } from '../utils/dom/index.js';

export function CursorHook() {
  document.body.addEventListener('pointermove', updateCursor)
}
