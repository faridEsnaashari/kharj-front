import React from 'react';

/*
 * IconTile
 *
 * The rounded square that leads every settings row and activity item.
 * tone: 'neutral' | 'brand' | 'success' | 'danger'
 *
 * Tone carries meaning in the activity feed: success = money in,
 * danger = money out. Match it to the Amount beside it.
 */
const IconTile = ({ children, tone = 'neutral', round = false, className = '', ...rest }) => (
  <span
    className={[
      'visily-icon-tile',
      tone !== 'neutral' && `visily-icon-tile--${tone}`,
      round && 'visily-icon-tile--round',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </span>
);

export default IconTile;
