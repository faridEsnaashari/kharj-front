// src/components/IncomeTab.jsx

import React, { useState } from 'react';
import { 
  BASEURL, 
  bankMapper, 
  incomeCategoryMapper, 
  createSelectOptions 
} from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);
const incomeCategoryOptions = createSelectOptions(incomeCategoryMapper);

const IncomeTab = ({ token, relatedUsers }) => {
  const [form, setForm] = useState({
    user: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    ballance: '', // Amount is named 'ballance' in original JS but used as 'amount' in body
    description: '',
    category: incomeCategoryOptions[0]?.value || '',
    bank: bankOptions[0]?.value || '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const key = e.target.id.replace('income-', '');
    // Handle the specific ID mapping for ballance/amount
    const formKey = key === 'ballance' ? 'ballance' : key;
    setForm({ ...form, [formKey]: e.target.value });
  };

  const handleSubmit = async () => {
    const { user, ballance, description, category, bank } = form;

    if (!user || !ballance || !description || !category || !bank) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      userId: Number(user),
      ownedBy: Number(user),
      amount: Number(ballance), // The API expects 'amount' based on the original JS submit logic
      bank,
      category,
      priority: 1, // Fixed priority value from original JS
    };

    try {
      setResult('Submitting Income...');
      const res = await fetch(`${BASEURL}/income`, {
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
      <h3>Incomes</h3>
      
      <label>
        User:
        <select id="income-user" value={form.user} onChange={handleChange}>
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Balance:
        <input 
          type="number" 
          id="income-ballance" 
          min="0" 
          value={form.ballance} 
          onChange={handleChange} 
        />
      </label>
      
      <label>
        Description:
        <input 
          type="text" 
          id="income-description" 
          value={form.description} 
          onChange={handleChange} 
        />
      </label>
      
      <label>
        Category:
        <select id="income-category" value={form.category} onChange={handleChange}>
          {incomeCategoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Bank:
        <select id="income-bank" value={form.bank} onChange={handleChange}>
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <button className="submit-btn" id="income-submit" onClick={handleSubmit}>
        Submit Income
      </button>
      <pre id="income-result" className="result-box">{result}</pre>
    </>
  );
};

export default IncomeTab;
