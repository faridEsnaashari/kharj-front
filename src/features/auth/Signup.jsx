import { useState } from 'react';
import {
  Badge,
  Button,
  Form,
  IconArrowRight,
  IconMail,
  IconShield,
  IconTag,
  IconTile,
  IconUser,
  Input,
  PasswordInput,
} from '../../shared/components';
import { useAuth } from './hooks/useAuth';
import './styles/auth.css';

const Signup = ({ onSignupSuccess, onSwitchToSignin }) => {
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    inviteCode: '',
  });

  const setField = (field) => {
    return (event) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };
  };

  const handleSubmit = async () => {
    try {
      await signup(formData);

      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch {
      return;
    }
  };

  return (
    <div className="auth-viewport">
      <div className="auth-screen">
        <header className="auth-header">
          <IconTile size="lg" className="auth-logo">
            ⚡
          </IconTile>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            The smartest way to track group wealth and settle shared debts.
          </p>
        </header>

        <Form onSubmit={handleSubmit}>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}

          <Input
            label="Full name"
            placeholder="John Doe"
            autoComplete="name"
            iconLeft={<IconUser size={18} />}
            value={formData.name}
            onChange={setField('name')}
          />

          <Input
            label="Email or phone"
            placeholder="name@example.com"
            autoComplete="email"
            iconLeft={<IconMail size={18} />}
            value={formData.email}
            onChange={setField('email')}
          />

          <PasswordInput
            placeholder="••••••••"
            autoComplete="new-password"
            value={formData.password}
            onChange={setField('password')}
          />

          <Input
            label="Invite code"
            optional
            placeholder="ABC-123"
            iconLeft={<IconTag size={18} />}
            value={formData.inviteCode}
            onChange={setField('inviteCode')}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            iconRight={<IconArrowRight size={18} />}
          >
            Create Free Account
          </Button>
        </Form>

        <div className="auth-switch">
          <p>Already have an account?</p>
          <Button variant="secondary" fullWidth onClick={onSwitchToSignin}>
            Log In Instead
          </Button>
        </div>

        <footer className="auth-footer">
          <Badge tone="positive" iconLeft={<IconShield size={14} />}>
            256-bit Encrypted Banking
          </Badge>
          <p className="auth-disclaimer">
            By signing up, you agree to Kharj's{' '}
            <strong>Terms of Service</strong> and{' '}
            <strong>Privacy Policy</strong>. Financial data is handled securely.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
