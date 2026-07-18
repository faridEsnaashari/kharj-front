// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import your styles here
// Design system: tokens + shared component styles. Imported after index.css so
// the Visly dark theme wins over the older light-theme leftovers in there.
import './shared/styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
