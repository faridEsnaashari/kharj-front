import { cx, toggleInArray } from '../utils/index.js';

export const Chip = ({
  selected = false,
  disabled = false,
  iconLeft = null,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={cx('ui-chip', selected && 'is-selected', className)}
      aria-pressed={selected}
      disabled={disabled}
      {...rest}
    >
      {iconLeft ? <span className="ui-chip__icon">{iconLeft}</span> : null}
      {children}
    </button>
  );
};

export const ChipGroup = ({
  options = [],
  value,
  onChange,
  multiple = false,
  label,
  className,
}) => {
  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }

    return value === optionValue;
  };

  const handleSelect = (optionValue) => {
    if (multiple) {
      onChange(toggleInArray(value, optionValue));
      return;
    }

    onChange(optionValue);
  };

  return (
    <div
      className={cx('ui-chip-group', className)}
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <Chip
          key={option.value}
          selected={isSelected(option.value)}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
};

export const Badge = ({
  tone = 'neutral',
  iconLeft = null,
  className,
  children,
}) => {
  return (
    <span className={cx('ui-badge', `ui-badge--${tone}`, className)}>
      {iconLeft ? <span className="ui-badge__icon">{iconLeft}</span> : null}
      {children}
    </span>
  );
};
