import React from 'react';
import Field from './Field';

/*
 * Textarea
 *
 * The multi-line note field from the New Payment screen. Vertically resizable
 * only — horizontal resize would break the fixed mobile frame.
 */
const Textarea = ({
  label,
  labelIcon,
  error,
  hint,
  required,
  optional,
  rows = 4,
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
      <textarea
        id={id}
        rows={rows}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        required={required}
        className={[
          'visily-input-field',
          'visily-textarea',
          invalid && 'visily-input-field--error',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
    )}
  </Field>
);

export default Textarea;
