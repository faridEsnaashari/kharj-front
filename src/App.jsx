import React, { useState } from 'react';
import { Signin, Signup, AUTH_STATES } from './features/auth';
import { isAuthenticated } from './features/auth/api/api.config';
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

  if (authState === AUTH_STATES.AUTHENTICATED) {
    return (
      <div className="app-root">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1>Welcome to Kharj! 🎉</h1>
          <p>Main app content will go here</p>
          <button onClick={() => {
            localStorage.removeItem('authToken');
            setAuthState(AUTH_STATES.SIGNIN);
          }}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (authState === AUTH_STATES.SIGNIN) {
    return <Signin onSigninSuccess={handleSigninSuccess} />;
  }

  if (authState === AUTH_STATES.SIGNUP) {
    return <Signup onSignupSuccess={handleSignupSuccess} />;
  }

  return null;
}

export default App;
