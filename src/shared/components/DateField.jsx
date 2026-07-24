import { useRef, useState } from 'react';
import { CALENDARS, formatForDisplay } from '../lib/date.js';
import { cx, splitFieldProps } from '../utils/index.js';
import { useDismiss } from '../hooks/useDismiss.js';
import { Calendar } from './Calendar.jsx';
import { Field } from './Field.jsx';
import { Control } from './primitives.jsx';
import { IconCalendar, IconClock } from './icons.jsx';

/*
 * DateField is deliberately NOT a native <input type="date">: the native
 * control cannot render the Persian (Jalali) calendar, which this app needs.
 * So it renders a read-only trigger plus a popover <Calendar>.
 *
 * `value` / `onChange` are always Gregorian ISO (`YYYY-MM-DD`); `calendar`
 * changes only the displayed text and the grid.
 */
export const DateField = (props) => {
  const [
    fieldProps,
    {
      value,
      onChange,
      calendar = CALENDARS.GREGORIAN,
      placeholder = 'Select a date',
      disabled = false,
    },
  ] = splitFieldProps(props);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useDismiss(containerRef, open, () => setOpen(false));

  const display = formatForDisplay(value, calendar);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <div className="ui-datefield" ref={containerRef}>
          <Control
            as="button"
            modifier="button"
            invalid={Boolean(fieldProps.error)}
            open={open}
            iconLeft={<IconCalendar size={18} />}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            {...ariaProps}
          >
            <span className={cx('ui-control__value', !display && 'is-placeholder')}>
              {display || placeholder}
            </span>
          </Control>

          {open ? (
            <div
              className="ui-datefield__popover"
              role="dialog"
              aria-label={fieldProps.label || 'Choose date'}
            >
              <Calendar
                value={value}
                calendar={calendar}
                onChange={(iso) => {
                  onChange(iso);
                  setOpen(false);
                }}
              />
            </div>
          ) : null}
        </div>
      )}
    </Field>
  );
};

/*
 * TimeField *is* a native <input type="time">. Time has no calendar dimension,
 * so there is nothing the OS picker gets wrong — unlike dates, where the native
 * control cannot express Jalali.
 */
export const TimeField = (props) => {
  const [fieldProps, inputProps] = splitFieldProps(props);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <Control invalid={Boolean(fieldProps.error)} iconLeft={<IconClock size={18} />}>
          <input
            type="time"
            className="ui-control__input"
            required={fieldProps.required}
            {...ariaProps}
            {...inputProps}
          />
        </Control>
      )}
    </Field>
  );
};
