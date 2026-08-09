import { cx } from '../utils/index.js';
import { Spinner } from './Spinner.jsx';

export const Button = ({
  variant = 'secondary',
  size = 'md',
  type = 'button',
  iconLeft = null,
  iconRight = null,
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={cx(
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${size}`,
        fullWidth && 'ui-button--full',
        loading && 'is-loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Spinner size={18} />
      ) : iconLeft ? (
        <span className="ui-button__icon">{iconLeft}</span>
      ) : null}

      <span className="ui-button__label">{children}</span>

      {iconRight ? <span className="ui-button__icon">{iconRight}</span> : null}
    </button>
  );
};

export const IconButton = ({
  label,
  variant = 'ghost',
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx('ui-icon-button', `ui-icon-button--${variant}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
};
