import React from 'react';

/*
 * Chip / ChipGroup
 *
 * The category picker from the New Payment screen. Selected state is a solid
 * blue fill — distinct from Card selection (blue border + tint), because chips
 * are small enough that a border alone reads as noise.
 */

export const Chip = ({ children, selected = false, disabled = false, className = '', ...rest }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    disabled={disabled}
    className={['visily-chip', selected && 'visily-chip--selected', className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {children}
  </button>
);

/*
 * options: [{ value, label, disabled? }]
 *
 * Single-select by default. Pass `multiple` and an array `value` to allow
 * several at once (e.g. filtering by more than one category).
 */
export const ChipGroup = ({
  options = [],
  value,
  onChange,
  multiple = false,
  label,
  className = '',
}) => {
  const isSelected = (optionValue) =>
    multiple ? Array.isArray(value) && value.includes(optionValue) : value === optionValue;

  const handleSelect = (optionValue) => {
    if (!onChange) {
      return;
    }

    if (!multiple) {
      onChange(optionValue);
      return;
    }

    const current = Array.isArray(value) ? value : [];
    onChange(
      current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue],
    );
  };

  return (
    <div
      className={`visily-chip-group ${className}`.trim()}
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={label}
    >
      {options.map((option) => (
        <Chip
          key={option.value}
          selected={isSelected(option.value)}
          disabled={option.disabled}
          role={multiple ? 'checkbox' : 'radio'}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
};

export default Chip;
