import axios from 'axios';

// API Base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};
