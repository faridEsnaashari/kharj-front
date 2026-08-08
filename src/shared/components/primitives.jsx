import { cx } from '../utils/index.js';

const focusInnerControl = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }

  event.currentTarget.querySelector('input, select, textarea')?.focus();
};

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
      onClick={as === 'div' ? focusInnerControl : undefined}
      {...rest}
    >
      {iconLeft ? <span className="ui-control__icon">{iconLeft}</span> : null}
      {children}
      {addonRight ? (
        <span className="ui-control__addon">{addonRight}</span>
      ) : null}
    </Component>
  );
};

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
