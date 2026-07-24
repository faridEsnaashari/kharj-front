import { cx } from '../utils/index.js';
import { Spinner } from './Spinner.jsx';

/*
 * Variants:
 *   primary   — the screen's single call to action. Exactly one per screen.
 *   secondary — bordered, filled surface. The default for everything else.
 *   ghost     — no border, no fill. For toolbar / inline actions.
 *   link      — reads as text, accent coloured.
 *   danger    — destructive confirmation only.
 *
 * `loading` disables the button and swaps the leading icon for a spinner; the
 * label stays put so the button does not change width mid-action.
 */
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
      ) : (
        iconLeft ? <span className="ui-button__icon">{iconLeft}</span> : null
      )}

      <span className="ui-button__label">{children}</span>

      {iconRight ? <span className="ui-button__icon">{iconRight}</span> : null}
    </button>
  );
};

/** A square, icon-only button. Requires an accessible label. */
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
