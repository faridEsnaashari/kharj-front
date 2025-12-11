// src/components/TabbedApp.jsx

import React, { useState, useEffect } from 'react';
import { BASEURL } from '../utils/api';
import PaymentTab from './PaymentTab';
import AccountTab from './AccountTab';
import IncomeTab from './IncomeTab';
import ExchangeTab from './ExchangeTab';

const tabMapping = {
  payment: 'Payment',
  account: 'Create Account',
  incomes: 'Incomes',
  exchange: 'Exchange',
};

const TabbedApp = ({ token }) => {
  const [activeTab, setActiveTab] = useState('payment');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Fetch related users on component mount
  useEffect(() => {
    const fetchRelatedUsers = async () => {
      try {
        const res = await fetch(`${BASEURL}/user/related-user`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch related users');
        const data = await res.json();
        setRelatedUsers(data.data);
      } catch (e) {
        console.error('Related users fetch failed:', e.message);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchRelatedUsers();
  }, [token]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // On mobile, close menu after selection
    if (window.innerWidth < 600) {
      setIsMenuOpen(false);
    }
  };

  const TabContent = () => {
    if (isLoadingUsers) {
      return <div>Loading user data...</div>;
    }
    
    // Pass relatedUsers down to the tab components
    const commonProps = { token, relatedUsers };

    switch (activeTab) {
      case 'payment':
        return <PaymentTab {...commonProps} />;
      case 'account':
        return <AccountTab {...commonProps} />;
      case 'incomes':
        return <IncomeTab {...commonProps} />;
      case 'exchange':
        return <ExchangeTab {...commonProps} />;
      default:
        return null;
    }
  };
  
  // Use inline style for menu dropdown to mimic original JS toggle
  // The original HTML logic used 'display: none'/'display: flex' toggle 
  const menuStyle = window.innerWidth < 600 && isMenuOpen ? { display: 'flex' } : { display: 'none' };


  return (
    <div id="main-app-content" style={{ display: 'block' }}> {/* Forced display:block to override App.jsx logic */}
      {/* Hamburger Menu Toggle */}
      <button 
        className="menu-toggle" 
        aria-label="Toggle menu" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776;
      </button>
      
      {/* Navigation Menu */}
      <nav 
        className="menu-dropdown" 
        id="menu-dropdown" 
        style={menuStyle}
      >
        {Object.keys(tabMapping).map((tabId) => (
          <button
            key={tabId}
            data-tab={tabId}
            className={activeTab === tabId ? 'active' : ''}
            onClick={() => handleTabChange(tabId)}
          >
            {tabMapping[tabId]}
          </button>
        ))}
      </nav>

      {/* Tab Content Area */}
      <div className="tab-content">
        <div className={`tab active`} id={activeTab}>
          <TabContent />
        </div>
      </div>
    </div>
  );
};

export default TabbedApp;
