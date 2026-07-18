import React, { useEffect, useRef, useState } from 'react';
import Field from './Field';
import Calendar from './Calendar';
import { CALENDARS, ISO_DATE, formatDate, toISO } from '../lib/date';
import { CalendarIcon } from './icons';

/*
 * DateField
 *
 * Read-only trigger + calendar popover. Not a native <input type="date">:
 * the native control cannot render the Jalali calendar, and this project
 * ships jalali-plugin-dayjs precisely because Persian dates are required.
 *
 * value / onChange are Gregorian ISO (`YYYY-MM-DD`); `calendar` only changes
 * what the user sees.
 */
const DateField = ({
  label = 'Date',
  labelIcon = <CalendarIcon />,
  value,
  onChange,
  calendar = CALENDARS.GREGORIAN,
  displayFormat = ISO_DATE,
  placeholder = 'Select a date',
  min,
  max,
  error,
  hint,
  required,
  optional,
  disabled = false,
  id: providedId,
  fieldClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click / Escape. Without this the popover survives a tap
  // elsewhere on the screen, which reads as a stuck overlay on mobile.
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const display = value ? formatDate(value, calendar, displayFormat) : '';

  const handleSelect = (iso) => {
    if (onChange) {
      onChange(toISO(iso));
    }
    setOpen(false);
  };

  return (
    <Field
      label={label}
      labelIcon={labelIcon}
      htmlFor={providedId}
      error={error}
      hint={hint}
      required={required}
      optional={optional}
      className={fieldClassName}
    >
      {({ id, describedBy, invalid }) => (
        <div className="visily-datefield-container" ref={containerRef}>
          <div className="visily-input-wrapper">
            <span className="visily-input-icon-left">
              <CalendarIcon />
            </span>
            <button
              id={id}
              type="button"
              disabled={disabled}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              className={[
                'visily-input-field',
                'visily-input-field--has-icon-left',
                'visily-datefield-trigger',
                !display && 'visily-datefield-trigger--empty',
                invalid && 'visily-input-field--error',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {display || placeholder}
            </button>
          </div>

          {open && (
            <div className="visily-popover" role="dialog" aria-label="Choose date">
              <Calendar
                value={value}
                onChange={handleSelect}
                calendar={calendar}
                min={min}
                max={max}
              />
            </div>
          )}
        </div>
      )}
    </Field>
  );
};

export default DateField;
