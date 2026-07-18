import React from 'react';

/*
 * SegmentedControl
 *
 * The "Summaries / Detailed History" switch. Use for 2–3 mutually exclusive
 * views of the same data; beyond that the labels stop fitting the mobile frame
 * and a Select is the better control.
 *
 * options: [{ value, label }]
 */
const SegmentedControl = ({ options = [], value, onChange, label, className = '' }) => (
  <div className={`visily-segment ${className}`.trim()} role="tablist" aria-label={label}>
    {options.map((option) => {
      const active = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={active}
          className={['visily-segment-option', active && 'visily-segment-option--active']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChange && onChange(option.value)}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
