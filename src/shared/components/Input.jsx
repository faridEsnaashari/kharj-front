import React, { useState } from 'react';
import Field from './Field';
import { EyeIcon, EyeOffIcon } from './icons';

/*
 * Input
 *
 * Text input with optional leading/trailing icons. When `type="password"` a
 * reveal toggle is added automatically — callers never wire that up themselves.
 *
 * Generalises the original features/auth/components/AuthInput.jsx.
 */
const Input = ({
  label,
  labelIcon,
  type = 'text',
  error,
  hint,
  required,
  optional,
  action,
  iconLeft,
  iconRight,
  id: providedId,
  className = '',
  fieldClassName = '',
  ...rest
}) => {
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword && revealed ? 'text' : type;

  // A password reveal toggle occupies the trailing slot, so a caller-supplied
  // trailing icon would collide with it. The toggle wins.
  const trailing = isPassword ? (
    <button
      type="button"
      className="visily-input-icon-right"
      onClick={() => setRevealed((v) => !v)}
      aria-label={revealed ? 'Hide password' : 'Show password'}
      aria-pressed={revealed}
      tabIndex={-1}
    >
      {revealed ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  ) : (
    iconRight && <span className="visily-input-icon-right">{iconRight}</span>
  );

  return (
    <Field
      label={label}
      labelIcon={labelIcon}
      htmlFor={providedId}
      error={error}
      hint={hint}
      required={required}
      optional={optional}
      action={action}
      className={fieldClassName}
    >
      {({ id, describedBy, invalid }) => (
        <div className="visily-input-wrapper">
          {iconLeft && <span className="visily-input-icon-left">{iconLeft}</span>}
          <input
            id={id}
            type={resolvedType}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            required={required}
            className={[
              'visily-input-field',
              iconLeft && 'visily-input-field--has-icon-left',
              trailing && 'visily-input-field--has-icon-right',
              invalid && 'visily-input-field--error',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />
          {trailing}
        </div>
      )}
    </Field>
  );
};

export default Input;
