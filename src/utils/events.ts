export type Event = MouseEvent | TouchEvent;

export const isMouseEvent = (e: Event): e is MouseEvent => e && 'screenX' in e;

export const isTouchEvent = (e: Event): e is TouchEvent => e && 'touches' in e;