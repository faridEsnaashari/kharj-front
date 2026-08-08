export const cx = (...parts) => {
  return parts.filter(Boolean).join(' ');
};

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

export const toggleInArray = (array, item) => {
  const current = Array.isArray(array) ? array : [];

  if (current.includes(item)) {
    return current.filter((entry) => entry !== item);
  }

  return [...current, item];
};
