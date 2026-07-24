import { useId } from 'react';
import { cx } from '../utils/index.js';

/*
 * Field owns everything around a control: the label, the optional/hint text,
 * the error message, and the aria wiring that connects them.
 *
 * It does not render the control itself — it calls `children` with the ids and
 * ARIA attributes the control must spread onto its input element:
 *
 *   <Field label="Amount" error={error}>
 *     {(controlProps) => <input {...controlProps} />}
 *   </Field>
 *
 * Every input type in this library composes Field. A new one must too —
 * that is what keeps labelling and error announcement consistent.
 */
export const Field = ({
  label,
  hint,
  error,
  optional = false,
  required = false,
  children,
  className,
}) => {
  const generatedId = useId();
  const controlId = `${generatedId}-control`;
  const errorId = `${generatedId}-error`;
  const hintId = `${generatedId}-hint`;

  const describedBy = cx(error && errorId, hint && hintId);

  const controlProps = {
    id: controlId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
    'aria-required': required || undefined,
  };

  return (
    <div className={cx('ui-field', className)}>
      {label ? (
        <div className="ui-field__label-row">
          <label className="ui-field__label" htmlFor={controlId}>
            {label}
          </label>
          {optional ? <span className="ui-field__optional">optional</span> : null}
        </div>
      ) : null}

      {children(controlProps)}

      {error ? (
        <p className="ui-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}

      {!error && hint ? (
        <p className="ui-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};
