import React from 'react';

/*
 * Field
 *
 * Label + control + message wrapper. Every input-like component composes this
 * rather than rendering its own label, so labels, spacing, error colour, and
 * the aria wiring stay identical across the whole system.
 *
 * `children` is a render prop receiving the ids the control must adopt:
 *   <Field label="Amount">{({ id, describedBy, invalid }) => <input ... />}</Field>
 */
const Field = ({
  label,
  labelIcon,
  htmlFor,
  required = false,
  optional = false,
  error,
  hint,
  action,
  children,
  className = '',
}) => {
  const generatedId = React.useId();
  const id = htmlFor || generatedId;

  // Error takes precedence over hint — never show both, it doubles the noise.
  const message = error || hint;
  const messageId = message ? `${id}-message` : undefined;

  return (
    <div className={`visily-field ${className}`.trim()}>
      {(label || action) && (
        <div className="visily-field-label-row">
          {label && (
            <label className="visily-field-label" htmlFor={id}>
              {labelIcon && <span className="visily-field-label-icon">{labelIcon}</span>}
              {label}
              {required && (
                <span className="visily-field-required" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          {optional && !action && <span className="visily-field-optional">optional</span>}
          {action}
        </div>
      )}

      {children({
        id,
        describedBy: messageId,
        invalid: Boolean(error),
      })}

      {message && (
        <p
          id={messageId}
          className={`visily-field-message ${error ? 'visily-field-message--error' : ''}`.trim()}
          role={error ? 'alert' : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Field;
