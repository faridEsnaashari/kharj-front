import { useState } from 'react';
import {
  Badge,
  Button,
  Form,
  IconArrowRight,
  IconShield,
  IconTile,
  IconUser,
  Input,
  PasswordInput,
} from '../../shared/components';
import { useAuth } from './hooks/useAuth';
import './styles/auth.css';

/*
 * There is no Visly mockup for Signin — it is derived from the Signup screen's
 * styling. The backend signs in with `username` (POST /auth/signin), so that
 * is the field, whatever the mockup family shows.
 */
const Signin = ({ onSigninSuccess, onSwitchToSignup }) => {
  const { signin, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signin({ username, password });

      if (onSigninSuccess) {
        onSigninSuccess();
      }
    } catch {
      /* surfaced through useAuth's error state */
    }
  };

  return (
    <div className="auth-viewport">
      <div className="auth-screen">
        <header className="auth-header">
          <IconTile size="lg" className="auth-logo">
            ⚡
          </IconTile>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to manage your shared wealth and debts.</p>
        </header>

        <Form onSubmit={handleSubmit}>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}

          <Input
            label="Username or email"
            placeholder="john_doe"
            autoComplete="username"
            iconLeft={<IconUser size={18} />}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <PasswordInput
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            iconRight={<IconArrowRight size={18} />}
          >
            Sign In
          </Button>
        </Form>

        <div className="auth-switch">
          <p>Don't have an account?</p>
          <Button variant="secondary" fullWidth onClick={onSwitchToSignup}>
            Create One Instead
          </Button>
        </div>

        <footer className="auth-footer">
          <Badge tone="positive" iconLeft={<IconShield size={14} />}>
            Secure Login
          </Badge>
          <p className="auth-disclaimer">
            Your data is encrypted and secure. We never share your financial information.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signin;
