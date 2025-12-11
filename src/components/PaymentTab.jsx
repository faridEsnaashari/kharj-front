// src/components/PaymentTab.jsx

import React, { useState } from 'react';
import { BASEURL, bankMapper, categoryMapper, createSelectOptions } from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);
const categoryOptions = createSelectOptions(categoryMapper);

const PaymentTab = ({ token, relatedUsers }) => {
  const [form, setForm] = useState({
    owner: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    price: '',
    bank: bankOptions[0]?.value || '',
    category: categoryOptions[0]?.value || '',
    description: '',
    isFun: '0', 
    isMaman: '0',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    // Determine the key based on the element's ID, extracting the value after 'payment-'
    const key = e.target.id.replace('payment-', '');
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    const { owner, price, bank, category, description, isFun, isMaman } = form;
    
    if (!price || !bank || !category || !description || !owner) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      price: Number(price),
      bank,
      category,
      description,
      isFun: isFun === '1', 
      isMaman: isMaman === '1', 
      ownerId: Number(owner),
    };

    try {
      setResult('Submitting Payment...');
      const res = await fetch(`${BASEURL}/payment`, {
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
      <h3>Payment</h3>
      <label>
        Owner:
        <select id="payment-owner" value={form.owner} onChange={handleChange}>
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Price:
        <input 
          type="number" 
          id="payment-price" 
          min="0" 
          value={form.price} 
          onChange={handleChange} 
        />
      </label>
      
      <label>
        Bank:
        <select id="payment-bank" value={form.bank} onChange={handleChange}>
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Category:
        <select id="payment-category" value={form.category} onChange={handleChange}>
          {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Description:
        <input 
          type="text" 
          id="payment-description" 
          value={form.description} 
          onChange={handleChange} 
        />
      </label>
      
      <label>
        Is Fun:
        <select id="payment-isFun" value={form.isFun} onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      
      <label>
        Is Maman:
        <select id="payment-isMaman" value={form.isMaman} onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      
      <button className="submit-btn" id="payment-submit" onClick={handleSubmit}>
        Submit Payment
      </button>
      <pre id="payment-result" className="result-box">{result}</pre>
    </>
  );
};

export default PaymentTab;
