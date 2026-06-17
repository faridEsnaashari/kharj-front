import React, { useState } from 'react';
import AuthInput from './components/AuthInput';
import { useAuth } from './hooks/useAuth';
import './styles/auth.css';

const Signin = ({ onSigninSuccess }) => {
  const { signin, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(formData);
      if (onSigninSuccess) {
        onSigninSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mobile-viewport-container">
      <div className="visily-auth-screen">

        <div className="visily-header">
          <div className="visily-app-logo">⚡</div>
          <h1 className="visily-main-title">Welcome Back</h1>
          <p className="visily-sub-title">
            Sign in to manage your shared wealth and debts.
          </p>
        </div>

        <form className="visily-auth-form" onSubmit={handleSubmit}>
          {error && <div className="visily-error-msg">{error}</div>}

          <AuthInput
            id="username"
            label="USERNAME OR EMAIL"
            icon="👤"
            placeholder="john_doe"
            value={formData.username}
            onChange={handleChange}
          />

          <AuthInput
            id="password"
            label="PASSWORD"
            type="password"
            icon="🔒"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="visily-submit-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In ➔'}
          </button>
        </form>

        <div className="visily-switch-prompt">
          <p>Don't have an account?</p>
          <button type="button" className="visily-secondary-action-btn">
            Create One Instead
          </button>
        </div>

        <div className="visily-bottom-badge-zone">
          <div className="visily-security-pill">
            🛡️ Secure Login
          </div>
          <p className="visily-disclaimer">
            Your data is encrypted and secure. We never share your financial information.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signin;
