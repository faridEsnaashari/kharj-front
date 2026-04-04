// src/components/AccountTab.jsx

import React, { useState } from 'react';
import { BASEURL, unitMapper, bankMapper, createSelectOptions } from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);
const unitOptions = createSelectOptions(unitMapper);

const AccountTab = ({ token, relatedUsers }) => {
  const [form, setForm] = useState({
    ballance: '',
    ownedBy: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    bank: bankOptions[0]?.value || '',
    unit: unitOptions[0]?.value || '',
    priority: '',
  });
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const { ballance, ownedBy, bank, priority, unit } = form;

    if (!ballance || !ownedBy || !bank || !priority || !unit) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      userId: Number(ownedBy),
      ownedBy: Number(ownedBy),
      ballance: Number(ballance),
      bank,
      priority: Number(priority),
      unit
    };

    try {
      setResult('Creating Account...');
      const res = await fetch(`${BASEURL}/account`, {
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
      <h3>Create Account</h3>
      
      <label>
        Balance:
        <input 
          type="number" 
          id="account-ballance" 
          min="0" 
          value={form.ballance} 
          onChange={e=>setForm({...form,ballance:e.target.value})} 
        />
      </label>
      
      <label>
        Owned By:
        <select 
          id="account-ownedBy"
          value={form.ownedBy}
           onChange={e=>setForm({...form,ownedBy:e.target.value})} 
        >
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Bank:
        <select 
          id="account-bank"
          value={form.bank}
          onChange={e=>setForm({...form,bank:e.target.value})} 
        >
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Unit:
        <select 
          id="account-bank"
          value={form.unit}
          onChange={e=>setForm({...form,unit:e.target.value})} 
        >
          {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Priority:
        <input 
          type="number" 
          id="account-priority" 
          min="0" 
          value={form.priority} 
          onChange={e=>setForm({...form,priority:e.target.value})} 
        />
      </label>
      
      <button className="submit-btn" id="account-submit" onClick={handleSubmit}>
        Create Account
      </button>
      <pre id="account-result" className="result-box">{result}</pre>
    </>
  );
};

export default AccountTab;
