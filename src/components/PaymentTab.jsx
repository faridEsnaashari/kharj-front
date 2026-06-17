import React, { useState } from 'react';
import { BASEURL, bankMapper, categoryMapper, createSelectOptions, unitMapper } from '../utils/api';

import JalaliDateInput from './JalaliDateInput'; 
import { date} from '../utils/date';

const bankOptions = createSelectOptions(bankMapper);
const categoryOptions = createSelectOptions(categoryMapper);
const unitOptions = createSelectOptions(unitMapper);

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
    unit:unitOptions[0]?.value||"",
    paidAtDate: getInitialJalaliDate(), 
  });
  const [result, setResult] = useState('');

  const handleSubmit = async () => {

    const { owner, price, bank, category, description, paidAtDate, unit } = form;
    
    if (!price || !bank || !category || !owner || !paidAtDate || !unit) {
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
      unit,
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
        <select
          id="payment-owner"
          value={form.owner}
          onChange={e=>setForm({...form,owner:e.target.value})} 
        >
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
          onChange={e=>setForm({...form,price:e.target.value})} 
        />
      </label>

      <JalaliDateInput
        label="Paid At (Jalali)"
        onDateChange={e=>setForm({...form,paidAtDate:e})}
        initialJalaliDate={form.paidAtDate}
      />
      
      <label>
        Bank:
        <select
          id="payment-bank"
          value={form.bank}
          onChange={e=>setForm({...form,bank:e.target.value})} 
        >
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>

      <label>
        Unit:
        <select 
          id="income-bank" 
          value={form.unit} 
          onChange={(e)=>setForm({...form,unit:e.target.value})} 
        >
          {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Category:
        <select
          id="payment-category"
          value={form.category}
          onChange={e=>setForm({...form,category:e.target.value})} 
        >
          {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Description:
        <input 
          type="text" 
          id="payment-description" 
          value={form.description} 
          onChange={e=>setForm({...form,description:e.target.value})} 
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
