import React, { useState } from 'react';
import AuthInput from './components/AuthInput';
import { useAuth } from './hooks/useAuth';
import './styles/auth.css';

const Signup = () => {
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    inviteCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert('Account Created Successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mobile-viewport-container">
      <div className="visily-auth-screen">
        
        {/* Logo Header */}
        <div className="visily-header">
          <div className="visily-app-logo">⚡</div>
          <h1 className="visily-main-title">Create Account</h1>
          <p className="visily-sub-title">
            The smartest way to track group wealth and settle shared debts.
          </p>
        </div>

        {/* Form elements */}
        <form className="visily-auth-form" onSubmit={handleSubmit}>
          {error && <div className="visily-error-msg">{error}</div>}

          <AuthInput
            id="name"
            label="FULL NAME"
            icon="👤"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          <AuthInput
            id="email"
            label="EMAIL OR PHONE"
            icon="✉️"
            placeholder="name@example.com"
            value={formData.email}
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

          <AuthInput
            id="inviteCode"
            label="INVITE CODE"
            rightText="optional"
            icon="🎫"
            placeholder="ABC-123"
            value={formData.inviteCode}
            onChange={handleChange}
          />

          <button type="submit" className="visily-submit-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Free Account ➔'}
          </button>
        </form>

        {/* Switcher Link */}
        <div className="visily-switch-prompt">
          <p>Already have an account?</p>
          <button type="button" className="visily-secondary-action-btn">Log In Instead</button>
        </div>

        {/* Bottom Metadata */}
        <div className="visily-bottom-badge-zone">
          <div className="visily-security-pill">
            🛡️ 256-bit Encrypted Banking
          </div>
          <p className="visily-disclaimer">
            By signing up, you agree to Kharj's <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. Financial data is handled securely.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
