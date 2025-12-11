// src/App.jsx

import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import TabbedApp from './components/TabbedApp';
import ClearStorageButton from './components/ClearStorageButton';

const App = () => {
  // Initialize token from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const handleSignInSuccess = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="container">
      <h2>API Tester</h2>

      <ClearStorageButton />

      {token ? ( <TabbedApp token={token} />) : ( <AuthForm onSignInSuccess={handleSignInSuccess} />)}
    </div>
  );
};

export default App;
