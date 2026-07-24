import { useEffect } from 'react';

/*
 * Dismiss-on-outside-click and dismiss-on-Escape for any popover-like surface
 * (DateField's calendar today; menus, tooltips, sheets tomorrow).
 *
 * `ref` is the element that counts as "inside"; while `active` is false the
 * hook attaches nothing.
 */
export const useDismiss = (ref, active, onDismiss) => {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onDismiss();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, active, onDismiss]);
};
