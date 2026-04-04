// src/components/IncomeTab.jsx

import React, { useState } from 'react';
import JalaliDateInput from './JalaliDateInput'; 
import { date} from '../utils/date';

import { 
  BASEURL, 
  bankMapper, 
  incomeCategoryMapper, 
  createSelectOptions, 
  unitMapper
} from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);
const unitOptions = createSelectOptions(unitMapper);
const incomeCategoryOptions = createSelectOptions(incomeCategoryMapper);

const IncomeTab = ({ token, relatedUsers }) => {
  const [form, setForm] = useState({
    user: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    ballance: '', // Amount is named 'ballance' in original JS but used as 'amount' in body
    description: '',
    category: incomeCategoryOptions[0]?.value || '',
    bank: bankOptions[0]?.value || '',
    unit:unitOptions[0]?.value || "",
    paidAtDate: date().calendar("jalali").format("YYYY-MM-DD HH:mm:ss"), 
  });
  const [result, setResult] = useState('');

  const handleSubmit = async () => {

    const { user, ballance, description, category, bank, paidAtDate, unit } = form;

    if (!user || !ballance || !description || !category || !bank|| !paidAtDate || !unit) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      userId: Number(user),
      ownedBy: Number(user),
      amount: Number(ballance), // The API expects 'amount' based on the original JS submit logic
      bank,
      unit,
      category,
      paidAt: date(paidAtDate,{jalali:true}).format("YYYY-MM-DD HH:mm:ss"), 
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
        <select 
          id="income-user" 
          value={form.user}
          onChange={(e)=>setForm({...form,user:e.target.value})} 
        >
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
          onChange={(e)=>setForm({...form,ballance:e.target.value})} 
        />
      </label>
                <JalaliDateInput
                  label="Date"
                  onDateChange={(val) => setForm({ ...form, paidAtDate: val })}
                  initialJalaliDate={form.paidAtDate}
                />
      
      <label>
        Description:
        <input 
          type="text" 
          id="income-description" 
          value={form.description} 
          onChange={(e)=>setForm({...form,description:e.target.value})} 
        />
      </label>
      
      <label>
        Category:
        <select 
          id="income-category" 
          value={form.category} 
          onChange={(e)=>setForm({...form,category:e.target.value})} 
        >
          {incomeCategoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        Bank:
        <select 
          id="income-bank" 
          value={form.bank} 
          onChange={(e)=>setForm({...form,bank:e.target.value})} 
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
      
      <button className="submit-btn" id="income-submit" onClick={handleSubmit}>
        Submit Income
      </button>
      <pre id="income-result" className="result-box">{result}</pre>
    </>
  );
};

export default IncomeTab;
