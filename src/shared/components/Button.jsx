import React from 'react';
import Spinner from './Spinner';

/*
 * Button
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger'
 * size:    'sm' | 'md' | 'lg'
 *
 * Design rule: exactly one `primary` per screen — it is the screen's single
 * call to action. Everything else is secondary, ghost, or link.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  fab = false,
  type = 'button',
  className = '',
  ...rest
}) => {
  const classes = [
    'visily-btn',
    `visily-btn--${variant}`,
    size !== 'md' && `visily-btn--${size}`,
    block && 'visily-btn--block',
    iconOnly && 'visily-btn--icon',
    fab && 'visily-btn--fab',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner /> : iconLeft}
      {!iconOnly && children}
      {!loading && iconRight}
    </button>
  );
};

export default Button;
