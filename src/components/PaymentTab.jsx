import React, { useState } from 'react';
import { BASEURL, bankMapper, categoryMapper, createSelectOptions } from '../utils/api';

import JalaliDateInput from './JalaliDateInput'; 
import { date} from '../utils/date';

const bankOptions = createSelectOptions(bankMapper);
const categoryOptions = createSelectOptions(categoryMapper);

const PaymentTab = ({ token, relatedUsers }) => {
  const getInitialJalaliDate = () => {
    return date().calendar("jalali").format("YYYY-MM-DD HH:mm:ss");
  };

  const [form, setForm] = useState({
    owner: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    price: '',
    bank: bankOptions[0]?.value || '',
    category: categoryOptions[0]?.value || '',
    description: '',
    isFun: '0', 
    isMaman: '0',
    paidAtDate: getInitialJalaliDate(), 
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const key = e.target.id.replace('payment-', '');
    setForm({ ...form, [key]: e.target.value });
  };
  
  // Handler to capture the date change from the reusable component
  const handleDateChange = (newDateString) => {
    setForm(prevForm => ({ ...prevForm, paidAtDate: newDateString }));
  };


  const handleSubmit = async () => {
    const { owner, price, bank, category, description, paidAtDate } = form;
    
    if (!price || !bank || !category || !owner || !paidAtDate) {
      setResult('Please fill all required fields.');
      return;
    }

    const body = {
      price: Number(price),
      bank,
      category,
      description,
      isFun: false, 
      isMaman: false, 
      ownerId: Number(owner),
      paidAt: date(paidAtDate,{jalali:true}).format("YYYY-MM-DD HH:mm:ss"), 
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

      <JalaliDateInput
        label="Paid At (Jalali)"
        onDateChange={handleDateChange}
        initialJalaliDate={form.paidAtDate}
      />
      
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
      
      <button className="submit-btn" id="payment-submit" onClick={handleSubmit}>
        Submit Payment
      </button>
      <pre id="payment-result" className="result-box">{result}</pre>
    </>
  );
};

export default PaymentTab;
