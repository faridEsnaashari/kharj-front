import { cx, toggleInArray } from '../utils/index.js';

/*
 * Chip vs Badge — the rule that decides which one you want:
 *   if it responds to a click, it is a Chip;
 *   if it is only status, it is a Badge.
 *
 * A selected Chip fills solid blue (the Category row in New Payment). That is
 * the chip form of selection; Cards instead use a border + tint.
 */
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

/*
 * A wrapping row of chips behaving as one selection control.
 *
 * `options` is `[{ value, label }]`. With `multiple`, `value` is an array and
 * `onChange` receives the toggled array; otherwise both are a single value.
 */
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
    <div className={cx('ui-chip-group', className)} role="group" aria-label={label}>
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

/*
 * Badge — non-interactive status. Tones: neutral, accent, positive, negative,
 * warning. Used for "Priority", "4.5% APR", the inbox count.
 */
export const Badge = ({ tone = 'neutral', iconLeft = null, className, children }) => {
  return (
    <span className={cx('ui-badge', `ui-badge--${tone}`, className)}>
      {iconLeft ? <span className="ui-badge__icon">{iconLeft}</span> : null}
      {children}
    </span>
  );
};
