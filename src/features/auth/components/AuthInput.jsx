import React, { useState } from 'react';

const AuthInput = ({ label, type = 'text', placeholder, icon, rightText, value, onChange, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="visily-input-group">
      <div className="visily-label-row">
        <label htmlFor={id}>{label}</label>
        {rightText && <span className="visily-optional-text">{rightText}</span>}
      </div>
      <div className="visily-input-wrapper">
        <span className="visily-input-icon-left">{icon}</span>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="visily-input-field"
        />
        {isPassword && (
          <button 
            type="button" 
            className="visily-input-icon-right" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️‍🗨️' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
