/*
 * Small pure utilities shared across the design system.
 * Anything here must be framework-free — no React imports.
 */

/**
 * Compose a className from conditional parts; falsy parts are dropped.
 *
 *   cx('ui-chip', selected && 'is-selected', className)
 */
export const cx = (...parts) => {
  return parts.filter(Boolean).join(' ');
};

/*
 * Split a field component's props into the set Field consumes and the rest,
 * which belongs to the inner control:
 *
 *   const [fieldProps, controlProps] = splitFieldProps(props);
 *
 * Every Field-composing component uses this instead of re-naming the wrapper
 * props itself, so adding a Field feature never touches the input components.
 * (Lives here, not in Field.jsx, so component files export only components —
 * a fast-refresh requirement.)
 */
export const splitFieldProps = ({
  label,
  hint,
  error,
  optional,
  required,
  className,
  ...controlProps
}) => {
  return [{ label, hint, error, optional, required, className }, controlProps];
};

/** Immutably toggle an item's membership in an array. */
export const toggleInArray = (array, item) => {
  const current = Array.isArray(array) ? array : [];

  if (current.includes(item)) {
    return current.filter((entry) => entry !== item);
  }

  return [...current, item];
};
