import { useState } from 'react';
import { cx, splitFieldProps } from '../utils/index.js';
import { Field } from './Field.jsx';
import { Control } from './primitives.jsx';
import { IconEye, IconEyeOff } from './icons.jsx';

/*
 * A single-line text input.
 *
 * `iconLeft` sits inside the control (the person / envelope / lock glyphs in
 * the Visly auth screen). `addonRight` is for a trailing control such as the
 * password reveal toggle or a unit suffix.
 */
export const Input = (props) => {
  const [fieldProps, { iconLeft, addonRight, ...inputProps }] = splitFieldProps(props);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <Control invalid={Boolean(fieldProps.error)} iconLeft={iconLeft} addonRight={addonRight}>
          <input
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

/** Input with a built-in show/hide toggle. */
export const PasswordInput = ({ label = 'Password', ...rest }) => {
  const [revealed, setRevealed] = useState(false);

  const toggle = (
    <button
      type="button"
      className="ui-control__addon-button"
      onClick={() => setRevealed((current) => !current)}
      aria-label={revealed ? 'Hide password' : 'Show password'}
    >
      {revealed ? <IconEyeOff size={18} /> : <IconEye size={18} />}
    </button>
  );

  return (
    <Input
      label={label}
      type={revealed ? 'text' : 'password'}
      addonRight={toggle}
      {...rest}
    />
  );
};

export const Textarea = (props) => {
  const [fieldProps, { rows = 4, ...textareaProps }] = splitFieldProps(props);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <Control modifier="textarea" invalid={Boolean(fieldProps.error)}>
          <textarea
            className="ui-control__input"
            rows={rows}
            required={fieldProps.required}
            {...ariaProps}
            {...textareaProps}
          />
        </Control>
      )}
    </Field>
  );
};

/*
 * A native <select> restyled to match. Native is the right call here: the OS
 * picker is better on mobile than anything we would build, and the control has
 * no calendar-style rendering problem that would force a custom popover.
 *
 * `options` is `[{ value, label }]`. `placeholder` renders a disabled first
 * option so an unset select reads as empty rather than as its first item.
 */
export const Select = (props) => {
  const [fieldProps, { options = [], placeholder, ...selectProps }] = splitFieldProps(props);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <Control modifier="select" invalid={Boolean(fieldProps.error)}>
          <select
            className="ui-control__input"
            required={fieldProps.required}
            {...ariaProps}
            {...selectProps}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Control>
      )}
    </Field>
  );
};

/*
 * Form is a thin <form> wrapper that prevents the default submit and stacks its
 * children with consistent spacing. It exists so screens never re-derive form
 * layout, and so `onSubmit` always receives a plain callback.
 */
export const Form = ({ onSubmit, className, children, ...rest }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form className={cx('ui-form', className)} onSubmit={handleSubmit} noValidate {...rest}>
      {children}
    </form>
  );
};

/** Places two controls side by side — the Date + Time pair in New Payment. */
export const FormRow = ({ className, children }) => {
  return <div className={cx('ui-form__row', className)}>{children}</div>;
};
