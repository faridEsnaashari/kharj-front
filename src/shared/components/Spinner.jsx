export const Spinner = ({ size = 20, label = 'Loading' }) => {
  return (
    <span
      className="ui-spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label={label}
    />
  );
};
