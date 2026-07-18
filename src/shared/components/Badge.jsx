import React from 'react';

/*
 * Badge
 *
 * Non-interactive status pill: "Priority", "Pro", "4.5% APR", "This Week".
 * If it responds to a click it is a Chip, not a Badge.
 *
 * tone: 'neutral' | 'brand' | 'success' | 'danger' | 'warning'
 */
const Badge = ({ children, tone = 'neutral', solid = false, icon, className = '', ...rest }) => {
  const toneClass = solid && tone === 'success' ? 'visily-badge--solid-success' : `visily-badge--${tone}`;

  return (
    <span className={['visily-badge', toneClass, className].filter(Boolean).join(' ')} {...rest}>
      {icon}
      {children}
    </span>
  );
};

export default Badge;
