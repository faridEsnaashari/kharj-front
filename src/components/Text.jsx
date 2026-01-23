import React, { useState } from 'react';
import { BASEURL, bankMapper, createSelectOptions } from '../utils/api';

const bankOptions = createSelectOptions(bankMapper);

const BankSmsTab = ({ token }) => {
  const [form, setForm] = useState({
    bank: bankOptions[0]?.value || '',
    text: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.text.trim()) {
      setResult('Please paste the SMS text.');
      return;
    }

    setLoading(true);
    setResult('Processing SMS...');

    try {
      const res = await fetch(`${BASEURL}/payment/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));
      
      if (json.success) {
        setForm({ ...form, text: '' }); // Clear text on success
      }
    } catch (e) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <h3>Process Bank SMS</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Paste the raw SMS received from your bank here.
      </p>

      <label>
        Select Bank:
        <select id="bank" value={form.bank} onChange={handleChange}>
          {bankOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginTop: '15px', display: 'block' }}>
        SMS Text:
        <textarea
          id="text"
          value={form.text}
          onChange={handleChange}
          placeholder="e.g., واریز به حساب ... مبلغ 500,000 ریال"
          rows="6"
          style={{ width: '100%', marginTop: '5px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={loading}
        style={{ marginTop: '15px' }}
      >
        {loading ? 'Analyzing...' : 'Submit SMS'}
      </button>

      <pre className="result-box" style={{ marginTop: '20px' }}>{result}</pre>
    </div>
  );
};

export default BankSmsTab;
