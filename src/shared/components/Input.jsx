import { useState } from 'react';
import { cx, splitFieldProps } from '../utils/index.js';
import { Field } from './Field.jsx';
import { Control } from './primitives.jsx';
import { IconEye, IconEyeOff } from './icons.jsx';

export const Input = (props) => {
  const [fieldProps, { iconLeft, addonRight, ...inputProps }] =
    splitFieldProps(props);

  return (
    <Field {...fieldProps}>
      {(ariaProps) => (
        <Control
          invalid={Boolean(fieldProps.error)}
          iconLeft={iconLeft}
          addonRight={addonRight}
        >
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

export const Select = (props) => {
  const [fieldProps, { options = [], placeholder, ...selectProps }] =
    splitFieldProps(props);

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

export const Form = ({ onSubmit, className, children, ...rest }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form
      className={cx('ui-form', className)}
      onSubmit={handleSubmit}
      noValidate
      {...rest}
    >
      {children}
    </form>
  );
};

export const FormRow = ({ className, children }) => {
  return <div className={cx('ui-form__row', className)}>{children}</div>;
};
