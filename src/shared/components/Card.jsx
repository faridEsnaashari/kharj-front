import { cx } from '../utils/index.js';
import { Pressable } from './primitives.jsx';

/*
 * Card is the panel primitive.
 *
 * Selection: a selectable Card shows a blue border plus a tinted fill. That is
 * one of the two selection forms in this system — the other is Chip, which
 * fills solid blue. Do not mix them in one screen.
 *
 * A Card with `onClick` renders as a <button> (via Pressable) so it is
 * keyboard reachable.
 */
export const Card = ({
  as = 'div',
  selected = false,
  interactive = false,
  onClick,
  className,
  children,
  ...rest
}) => {
  return (
    <Pressable
      as={as}
      onClick={onClick}
      pressed={selected}
      className={cx(
        'ui-card',
        selected && 'is-selected',
        (onClick || interactive) && 'is-interactive',
        className,
      )}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const cardPart = (partClass) => {
  const Part = ({ className, children }) => {
    return <div className={cx(partClass, className)}>{children}</div>;
  };

  return Part;
};

export const CardHeader = cardPart('ui-card__header');
export const CardBody = cardPart('ui-card__body');
export const CardFooter = cardPart('ui-card__footer');

/*
 * A rounded square holding an icon — the Pay / Income / Exchange / Scan tiles
 * on the dashboard, and the leading glyph on a transaction row.
 *
 * `tone` tints the icon and its backing fill: accent, positive, negative,
 * warning, or neutral.
 */
export const IconTile = ({ tone = 'neutral', size = 'md', className, children }) => {
  return (
    <span
      className={cx('ui-icon-tile', `ui-icon-tile--${tone}`, `ui-icon-tile--${size}`, className)}
    >
      {children}
    </span>
  );
};
