import React from 'react';

/*
 * ProgressBar
 *
 * The allocation-share bars on the payment screen.
 * tone: 'brand' | 'success' | 'danger'
 */
const ProgressBar = ({ value = 0, max = 100, tone = 'brand', label, className = '' }) => {
  // Clamp so a bad ratio can never render a bar wider than its track.
  const safeMax = max > 0 ? max : 100;
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div
      className={`visily-progress ${className}`.trim()}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label}
    >
      <div
        className={['visily-progress-fill', tone !== 'brand' && `visily-progress-fill--${tone}`]
          .filter(Boolean)
          .join(' ')}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
