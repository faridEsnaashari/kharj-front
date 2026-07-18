import React from 'react';
import Field from './Field';
import { ChevronDownIcon } from './icons';

/*
 * Select
 *
 * Native <select> restyled to match the input treatment. Native is deliberate:
 * on mobile it opens the OS picker, which beats any custom dropdown for
 * usability and accessibility.
 *
 * options: [{ value, label, disabled? }]
 */
const Select = ({
  label,
  labelIcon,
  options = [],
  placeholder,
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
        <select
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          required={required}
          className={[
            'visily-input-field',
            'visily-select',
            invalid && 'visily-input-field--error',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="visily-select-chevron">
          <ChevronDownIcon />
        </span>
      </div>
    )}
  </Field>
);

export default Select;
