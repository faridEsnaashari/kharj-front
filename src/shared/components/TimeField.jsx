import React from 'react';
import Field from './Field';
import { ClockIcon } from './icons';

/*
 * TimeField
 *
 * Native <input type="time"> — unlike dates, time has no calendar dimension,
 * so the native control is correct here and gives us the OS picker for free.
 * Value is a 24-hour `HH:mm` string, matching the backend's time format.
 */
const TimeField = ({
  label = 'Time',
  labelIcon = <ClockIcon />,
  error,
  hint,
  required,
  optional,
  id: providedId,
  className = '',
  fieldClassName = '',
  ...rest
}) => (
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
      <div className="visily-input-wrapper">
        <span className="visily-input-icon-left">
          <ClockIcon />
        </span>
        <input
          id={id}
          type="time"
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          required={required}
          className={[
            'visily-input-field',
            'visily-input-field--has-icon-left',
            'visily-datefield',
            invalid && 'visily-input-field--error',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
      </div>
    )}
  </Field>
);

export default TimeField;
