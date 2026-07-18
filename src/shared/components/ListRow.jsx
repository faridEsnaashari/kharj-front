import React from 'react';
import { ChevronRightIcon } from './icons';

/*
 * ListRow / List
 *
 * One row shape covers the settings list, the activity feed, and the account
 * list — they differ only in what fills the leading and trailing slots.
 *
 * Renders as a <button> when `onClick` is given so keyboard users can reach it;
 * otherwise a plain <div>, because a non-interactive button is a trap.
 */
export const ListRow = ({
  leading,
  title,
  subtitle,
  trailing,
  chevron = false,
  danger = false,
  onClick,
  className = '',
  ...rest
}) => {
  const interactive = Boolean(onClick);
  const Component = interactive ? 'button' : 'div';

  return (
    <Component
      className={[
        'visily-list-row',
        interactive && 'visily-list-row--interactive',
        danger && 'visily-list-row--danger',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      type={interactive ? 'button' : undefined}
      {...rest}
    >
      {leading}

      <span className="visily-list-row-body">
        <span className="visily-list-row-title">{title}</span>
        {subtitle && <span className="visily-list-row-subtitle">{subtitle}</span>}
      </span>

      {(trailing || chevron) && (
        <span className="visily-list-row-trailing">
          {trailing}
          {chevron && (
            <span className="visily-list-row-chevron">
              <ChevronRightIcon />
            </span>
          )}
        </span>
      )}
    </Component>
  );
};

export const List = ({ children, divided = true, className = '' }) => (
  <div
    className={['visily-list', divided && 'visily-list--divided', className]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);

export default ListRow;
