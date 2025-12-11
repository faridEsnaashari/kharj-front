// src/components/AuthForm.jsx

import React, { useState } from 'react';
import { BASEURL } from '../utils/api';

const AuthForm = ({ onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async () => {
    if (!username || !password) {
      setMessage('Please enter username and password.');
      return;
    }

    setMessage('Signing in...');
    
    try {
      const res = await fetch(`${BASEURL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      if (!res.ok || !data.data?.token) {
        throw new Error(data.message || 'Invalid credentials');
      }
      
      const token = data.data.token;
      localStorage.setItem('token', token);
      setMessage('');
      onSignInSuccess(token);
      
    } catch (e) {
      setMessage('Sign-in failed: ' + e.message);
    }
  };

  return (
    <div id="signin-form">
      <label>
        Username:
        <input 
          type="text" 
          id="username" 
          autoComplete="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="submit-btn" id="signin-btn" onClick={handleSignIn}>
        Sign In
      </button>
      <p id="signin-result">{message}</p>
    </div>
  );
};

export default AuthForm;
