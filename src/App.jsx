import React, { useState } from 'react';
import { Signin, Signup, AUTH_STATES } from './features/auth';
import { isAuthenticated, removeAuthToken } from './features/auth/api/api.config';
import './App.css';

function App() {
  const [authState, setAuthState] = useState(() =>
    isAuthenticated() ? AUTH_STATES.AUTHENTICATED : AUTH_STATES.SIGNIN
  );

  const handleSigninSuccess = () => {
    setAuthState(AUTH_STATES.AUTHENTICATED);
  };

  const handleSignupSuccess = () => {
    setAuthState(AUTH_STATES.SIGNIN);
  };

  const handleLogout = () => {
    removeAuthToken();
    setAuthState(AUTH_STATES.SIGNIN);
  };

  if (authState === AUTH_STATES.AUTHENTICATED) {
    return (
      <div className="app-root">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1>Welcome to Kharj! 🎉</h1>
          <p>Main app content will go here</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  if (authState === AUTH_STATES.SIGNUP) {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onSwitchToSignin={() => setAuthState(AUTH_STATES.SIGNIN)}
      />
    );
  }

  return (
    <Signin
      onSigninSuccess={handleSigninSuccess}
      onSwitchToSignup={() => setAuthState(AUTH_STATES.SIGNUP)}
    />
  );
}

export default App;
