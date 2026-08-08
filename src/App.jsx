import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signin, Signup, AUTH_STATES } from './features/auth';
import {
  isAuthenticated,
  removeAuthToken,
} from './features/auth/api/api.config';
import { Dashboard } from './features/dashboard';
import { Payment } from './features/payments';
import { Income } from './features/income';
import { Exchange } from './features/exchange';
import { Inbox } from './features/inbox';
import { Accounts } from './features/accounts';
import { Debts } from './features/debts';
import {
  BottomNav,
  IconHome,
  IconWallet,
  IconArrowDownLeft,
  IconExchange,
  IconUpload,
} from './shared/components';
import './App.css';

const NAV_TABS = [
  { key: 'home', label: 'Home', icon: IconHome, path: '/' },
  { key: 'payment', label: 'Payment', icon: IconWallet, path: '/payment' },
  { key: 'income', label: 'Income', icon: IconArrowDownLeft, path: '/income' },
  {
    key: 'exchange',
    label: 'Exchange',
    icon: IconExchange,
    path: '/exchange',
  },
  { key: 'inbox', label: 'Inbox', icon: IconUpload, path: '/inbox' },
];

function AuthenticatedShell({ onLogout }) {
  return (
    <BrowserRouter>
      <div
        className="app-root"
        style={{ background: 'var(--color-bg)', minHeight: '100dvh' }}
      >
        <div style={{ textAlign: 'right', padding: '8px 16px' }}>
          <button onClick={onLogout}>Logout</button>
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/income" element={<Income />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav tabs={NAV_TABS} />
      </div>
    </BrowserRouter>
  );
}

function App() {
  const [authState, setAuthState] = useState(() =>
    isAuthenticated() ? AUTH_STATES.AUTHENTICATED : AUTH_STATES.SIGNIN,
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
    return <AuthenticatedShell onLogout={handleLogout} />;
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
