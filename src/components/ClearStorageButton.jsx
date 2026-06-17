// src/components/ClearStorageButton.jsx

import React from 'react';
import {logout} from './auth-token.logic';

const ClearStorageButton = () => {
  const handleClearStorage = () => {
    logout()
    alert('LocalStorage cleared. Reloading...');
    window.location.reload();
  };

  return (
    <button
      className="submit-btn"
      id="clear-storage-btn"
      onClick={handleClearStorage}
      style={{
        float: 'right',
        backgroundColor: '#d9534f',
        color: 'white',
        marginTop: '-2.5rem',
      }}
    >
      Clear Storage
    </button>
  );
};

export default ClearStorageButton;
