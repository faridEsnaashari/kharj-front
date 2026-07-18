import React from 'react';

/*
 * Card
 *
 * variant: 'default' | 'feature'  — feature is the blue gradient hero card
 *                                   (dashboard net value, settings profile).
 *
 * Pass `selectable` to get the source-account picker behaviour: the card
 * becomes a real <button> so it is keyboard-operable, and selection renders as
 * a blue border plus a tinted fill.
 */
const Card = ({
  children,
  variant = 'default',
  selectable = false,
  selected = false,
  flush = false,
  className = '',
  as,
  ...rest
}) => {
  const Component = as || (selectable ? 'button' : 'div');

  const classes = [
    'visily-card',
    variant !== 'default' && `visily-card--${variant}`,
    flush && 'visily-card--flush',
    selectable && 'visily-card--selectable',
    selected && 'visily-card--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectableProps = selectable
    ? { type: Component === 'button' ? 'button' : undefined, 'aria-pressed': selected }
    : {};

  return (
    <Component className={classes} {...selectableProps} {...rest}>
      {children}
    </Component>
  );
};

export default Card;
