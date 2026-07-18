import React from 'react';

/*
 * Spinner
 *
 * Sizes to the current font-size (1em) and inherits currentColor, so it drops
 * into a button or a row of text without configuration.
 */
const Spinner = ({ label = 'Loading', className = '', ...rest }) => (
  <span className={`visily-spinner ${className}`.trim()} role="status" {...rest}>
    <span className="visily-sr-only">{label}</span>
  </span>
);

export default Spinner;
