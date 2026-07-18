import React from 'react';

/*
 * Switch
 *
 * Toggle for the settings rows. Applies immediately — there is no Save button
 * on those screens, so never pair this with a deferred commit.
 */
const Switch = ({ checked = false, onChange, disabled = false, label, className = '', ...rest }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange && onChange(!checked)}
    className={['visily-switch', checked && 'visily-switch--on', className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    <span className="visily-switch-thumb" />
  </button>
);

export default Switch;
