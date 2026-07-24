import { useId } from 'react';
import { cx } from '../utils/index.js';

/*
 * SegmentedControl — a small set of mutually exclusive views, rendered as one
 * pill split into segments (the Summaries / Detailed History switch on the
 * Debts Ledger). Use it for switching *what is shown*; use ChipGroup for
 * filtering or picking a value.
 */
export const SegmentedControl = ({
  options = [],
  value,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={cx('ui-segmented', className)} role="tablist" aria-label={label}>
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cx('ui-segmented__option', selected && 'is-selected')}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

/*
 * Switch — an immediate on/off setting (Profile & Settings). It commits on
 * change; if a toggle needs a Save button, it is a checkbox in a form, not this.
 */
export const Switch = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className,
}) => {
  const id = useId();

  return (
    <div className={cx('ui-switch', disabled && 'is-disabled', className)}>
      <div className="ui-switch__text">
        <label className="ui-switch__label" htmlFor={id}>
          {label}
        </label>
        {description ? <p className="ui-switch__description">{description}</p> : null}
      </div>

      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={cx('ui-switch__track', checked && 'is-on')}
        onClick={() => onChange(!checked)}
      >
        <span className="ui-switch__thumb" />
      </button>
    </div>
  );
};
