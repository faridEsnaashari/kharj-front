// src/components/ExchangeTab.jsx

import React, { useState } from 'react';
import { BASEURL, bankMapper, createSelectOptions } from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);

const ExchangeTab = ({ token, relatedUsers }) => {
  const defaultOwnerId = relatedUsers.length > 0 ? relatedUsers[0].id : '';
  const defaultBank = bankOptions[0]?.value || '';

  const [form, setForm] = useState({
    fromAccount: defaultBank,
    toAccount: defaultBank,
    amount: '',
    fromOwner: defaultOwnerId,
    toOwner: defaultOwnerId,
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    // Determine the key based on the element's ID, extracting the value after 'exchange-'
    const key = e.target.id.replace('exchange-', '');
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    const { fromAccount, toAccount, amount, fromOwner, toOwner } = form;

    if (!fromAccount || !toAccount || !amount || !fromOwner || !toOwner) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      fromAccount: fromAccount,
      toAccount: toAccount,
      amount: Number(amount),
      fromOwner: Number(fromOwner),
      toOwner: Number(toOwner),
    };

    try {
      setResult('Submitting Exchange...');
      const res = await fetch(`${BASEURL}/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setResult('Error: ' + e.message);
    }
  };

  return (
    <>
      <h3>Exchange</h3>
      
      <label>
        From Account (Bank):
        <select id="exchange-fromAccount" value={form.fromAccount} onChange={handleChange}>
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        To Account (Bank):
        <select id="exchange-toAccount" value={form.toAccount} onChange={handleChange}>
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Amount:
        <input 
          type="number" 
          id="exchange-amount" 
          min="0" 
          value={form.amount} 
          onChange={handleChange} 
        />
      </label>
      
      <label>
        From Owner:
        <select id="exchange-fromOwner" value={form.fromOwner} onChange={handleChange}>
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        To Owner:
        <select id="exchange-toOwner" value={form.toOwner} onChange={handleChange}>
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <button className="submit-btn" id="exchange-submit" onClick={handleSubmit}>
        Submit Exchange
      </button>
      <pre id="exchange-result" className="result-box">{result}</pre>
    </>
  );
};

export default ExchangeTab;
