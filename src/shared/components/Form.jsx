import React from 'react';

/*
 * Form
 *
 * Owns the vertical rhythm between fields so no field needs its own margin.
 * Also swallows the default browser submit so callers always get a clean
 * handler signature.
 */
const Form = ({ children, onSubmit, className = '', ...rest }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form className={`visily-form ${className}`.trim()} onSubmit={handleSubmit} noValidate {...rest}>
      {children}
    </form>
  );
};

export default Form;
