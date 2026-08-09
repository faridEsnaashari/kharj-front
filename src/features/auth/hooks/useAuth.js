import { useState } from 'react';
import { api, setAuthToken } from '../api/api.config';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/signin', {
        username: credentials.username || credentials.email,
        password: credentials.password,
      });

      const token = response.data.data?.token;

      if (!token) {
        throw new Error('No token received from server');
      }

      setAuthToken(token);

      return {
        success: true,
        message: 'Signin successful',
        token,
      };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Signin failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!formData.email || !formData.password) {
            reject(new Error('Email and Password are required.'));
          } else {
            const mockToken = 'mock-jwt-token-' + Date.now();
            setAuthToken(mockToken);
            resolve({ success: true, token: mockToken });
          }
        }, 1500);
      });

      return {
        success: true,
        message: 'Signup successful (mock)',
      };
    } catch (err) {
      const errorMessage = err.message || 'Signup failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signin, signup, loading, error };
};
