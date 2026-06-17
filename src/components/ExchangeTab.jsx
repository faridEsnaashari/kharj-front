// src/components/ExchangeTab.jsx

import React, { useState } from 'react';
import { BASEURL, bankMapper, createSelectOptions, unitMapper } from '../utils/api';
import JalaliDateInput from './JalaliDateInput'; 
import { date} from '../utils/date';

const bankOptions = createSelectOptions(bankMapper);
const unitOptions = createSelectOptions(unitMapper );

const ExchangeTab = ({ token, relatedUsers }) => {
  const defaultOwnerId = relatedUsers.length > 0 ? relatedUsers[0].id : '';
  const defaultBank = bankOptions[0]?.value || '';
  const defaultUnit = unitOptions[0]?.value || '';

  const [form, setForm] = useState({
    fromAccount: defaultBank,
    toAccount: defaultBank,
    fromUnit: defaultUnit,
    toUnit: defaultUnit,
    fromAmount: 0,
    toAmount: 0,
    fromOwner: defaultOwnerId,
    toOwner: defaultOwnerId,
    paidAtDate: date().calendar("jalali").format("YYYY-MM-DD HH:mm:ss"), 
  });
  const [result, setResult] = useState('');

  const handleSubmit = async () => {

    const { fromAccount, toAccount, fromAmount, toAmount, fromOwner, toOwner, paidAtDate, fromUnit,toUnit } = form;

    if (!fromAccount || !toAccount || !fromAmount || !toAmount || !fromOwner || !toOwner || !paidAtDate || !fromUnit || !toUnit) {
      setResult('Please fill all fields.');
      return;
    }

    const body = {
      fromAccount,
      toAccount,
      fromUnit,
      toUnit,
      fromAmount: Number(fromAmount),
      toAmount: Number(toAmount),
      fromOwner: Number(fromOwner),
      toOwner: Number(toOwner),
      paidAt: date(paidAtDate,{jalali:true}).format("YYYY-MM-DD HH:mm:ss"), 
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
        <select 
          id="exchange-fromAccount" 
          value={form.fromAccount} 
          onChange={(e)=>setForm({...form,fromAccount:e.target.value})}
        >
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        from Unit:
        <select 
          id="exchange-toAccount"
          value={form.fromUnit} 
          onChange={(e)=>setForm({...form,fromUnit:e.target.value})}
        >
          {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        To Account (Bank):
        <select 
          id="exchange-toAccount"
          value={form.toAccount} 
          onChange={(e)=>setForm({...form,toAccount:e.target.value})}
        >
          {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        To Unit:
        <select 
          id="exchange-toAccount"
          value={form.toUnit} 
          onChange={(e)=>setForm({...form,toUnit:e.target.value})}
        >
          {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </label>
      
      <label>
        from Amount:
        <input 
          type="number" 
          id="exchange-amount" 
          min="0" 
          value={form.fromAmount} 
          onChange={(e)=>setForm({...form,fromAmount:e.target.value})}
        />
      </label>
      
      <label>
        to Amount:
        <input 
          type="number" 
          id="exchange-amount" 
          min="0" 
          value={form.toAmount} 
          onChange={(e)=>setForm({...form,toAmount:e.target.value})}
        />
      </label>
      
      <label>
        From Owner:
        <select 
          id="exchange-fromOwner"
          value={form.fromOwner}
          onChange={(e)=>setForm({...form,fromOwner:e.target.value})}
        >
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        To Owner:
        <select 
          id="exchange-toOwner"
          value={form.toOwner}
          onChange={(e)=>setForm({...form,toOwner:e.target.value})}
        >
          {relatedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
                <JalaliDateInput
                  label="Date"
                  onDateChange={(val) => setForm({ ...form, paidAtDate: val })}
                  initialJalaliDate={form.paidAtDate}
                />
      
      <button className="submit-btn" id="exchange-submit" onClick={handleSubmit}>
        Submit Exchange
      </button>
      <pre id="exchange-result" className="result-box">{result}</pre>
    </>
  );
};

export default ExchangeTab;
