import { cx } from '../utils/index.js';
import { Pressable } from './primitives.jsx';

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

export const IconTile = ({
  tone = 'neutral',
  size = 'md',
  className,
  children,
}) => {
  return (
    <span
      className={cx(
        'ui-icon-tile',
        `ui-icon-tile--${tone}`,
        `ui-icon-tile--${size}`,
        className,
      )}
    >
      {children}
    </span>
  );
};
