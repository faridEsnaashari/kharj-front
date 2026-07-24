import { cx } from '../utils/index.js';

/*
 * Internal building blocks for the design system. Screens should not import
 * these directly — they exist so the public components (Input, Card, ListRow,
 * DateField, …) don't each re-implement the same shell.
 */

/*
 * Control — the visual shell every form control sits in: the bordered,
 * filled box with an optional leading icon and trailing addon.
 *
 * `as="button"` turns the shell itself into the interactive element
 * (DateField's trigger); the default is a plain wrapper around an inner
 * input/select/textarea.
 */
export const Control = ({
  as = 'div',
  modifier,
  invalid = false,
  open = false,
  iconLeft = null,
  addonRight = null,
  className,
  children,
  ...rest
}) => {
  const Component = as;

  return (
    <Component
      className={cx(
        'ui-control',
        iconLeft && 'ui-control--with-icon',
        addonRight && 'ui-control--with-addon',
        modifier && `ui-control--${modifier}`,
        invalid && 'is-invalid',
        open && 'is-open',
        className,
      )}
      {...rest}
    >
      {iconLeft ? <span className="ui-control__icon">{iconLeft}</span> : null}
      {children}
      {addonRight ? <span className="ui-control__addon">{addonRight}</span> : null}
    </Component>
  );
};

/*
 * Pressable — renders as a real <button> whenever an onClick is present, and
 * as `as` (default div) otherwise, so clickable surfaces are always keyboard
 * reachable without every component re-deriving that rule.
 *
 * `pressed` maps to aria-pressed, and only when the element is interactive.
 */
export const Pressable = ({
  as = 'div',
  onClick,
  pressed,
  className,
  children,
  ...rest
}) => {
  const clickable = Boolean(onClick);
  const Component = clickable ? 'button' : as;

  return (
    <Component
      className={className}
      onClick={onClick}
      type={clickable ? 'button' : undefined}
      aria-pressed={clickable ? pressed : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
};
