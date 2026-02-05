import React, { useState } from 'react';
import { BASEURL, bankMapper, categoryMapper, createSelectOptions } from '../utils/api';
import JalaliDateInput from './JalaliDateInput'; 
import { date } from '../utils/date';

const bankOptions = createSelectOptions(bankMapper);
const categoryOptions = createSelectOptions(categoryMapper);

const UncompletePaymentTab = ({ token, relatedUsers }) => {
  const [uncompletes, setUncompletes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  // 1. Expanded Filter State
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    bank: bankOptions[0]?.value || '',
  });

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    owner: relatedUsers.length > 0 ? relatedUsers[0].id : '',
    price: '',
    bank: '',
    category: categoryOptions[0]?.value || '',
    description: '',
    paidAtDate: date().calendar("jalali").format("YYYY-MM-DD HH:mm:ss"),
  });

  const fetchUncompletes = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`${BASEURL}/payment/uncompeletes?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      
      if (json.success) {
        setUncompletes(json.data.rows);
        setTotal(json.data.paginationData.total);
        setResult(`Showing ${json.data.rows.length} of ${json.data.paginationData.total} items.`);
      } else {
        setResult('API Error: ' + json.message);
      }
    } catch (e) {
      setResult('Fetch Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Generic Filter Handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      // Convert to number if it's page or size, otherwise keep string
      [name]: (name === 'page' || name === 'size') ? Number(value) : value
    }));
  };

  const handleProcess = (item) => {
    const initialJalali = item.paidAt 
      ? date(item.paidAt).calendar("jalali").format("YYYY-MM-DD HH:mm:ss")
      : date().calendar("jalali").format("YYYY-MM-DD HH:mm:ss");

    setEditingId(item.id);
    setForm({
      ...form,
      price: item.amount || '',
      bank: filters.bank,
      description:  '',
      paidAtDate: initialJalali
    });
  };

  const handleFormChange = (e) => {
    const key = e.target.id.replace('un-payment-', '');
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async (uncompleteId) => {
    const { owner, price, bank, category, description, paidAtDate } = form;

    const body = {
      price: Number(price),
      bank,
      category,
      description,
      isFun: false,
      isMaman: false,
      ownerId: Number(owner),
      paidAt: date(paidAtDate, { jalali: true }).format("YYYY-MM-DD HH:mm:ss"),
      uncompeletePaymentId: uncompleteId, 
    };

    try {
      setResult('Submitting...');
      const res = await fetch(`${BASEURL}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResult('Success: ' + json.message);
      setEditingId(null);
      fetchUncompletes(); 
    } catch (e) {
      setResult('Submit Error: ' + e.message);
    }
  };

  // Calculate total pages for UI reference
  const totalPages = Math.ceil(total / filters.size);

  return (
    <div className="tab-content">
      <h3>Uncomplete Payments</h3>

      {/* --- Filter Bar with Page & Size --- */}
      <div className="filter-bar" style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center', background: '#eee', padding: '10px' }}>
        <label>
          Bank:
          <select name="bank" value={filters.bank} onChange={handleFilterChange}>
            {bankOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </label>

        <label>
          Size:
          <select name="size" value={filters.size} onChange={handleFilterChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>

        <label>
          Page:
          <input 
            type="number" 
            name="page" 
            min="1" 
            max={totalPages}
            value={filters.page} 
            onChange={handleFilterChange} 
            style={{ width: '60px' }} 
          />
          <span style={{ fontSize: '12px', color: '#666' }}> of {totalPages || 1}</span>
        </label>

        <button onClick={fetchUncompletes} disabled={loading} style={{ padding: '5px 15px' }}>
          {loading ? '...' : 'Search'}
        </button>
      </div>

      <pre className="result-box" style={{ fontSize: '12px' }}>{result}</pre>

      <div className="list">
        {uncompletes.map((item) => (
          <div key={item.id} className="card" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: '80%' }}>
                <strong>{item.amount.toLocaleString()} Tomans</strong>
                <p style={{ fontSize: '12px', color: '#555', margin: '4px 0' }}>{item.description}</p>
                <small>Bank Date: {date(item.paidAt).calendar("jalali").format("YYYY/MM/DD HH:mm")}</small>
                <div></div>
                <small>day: {date(item.paidAt).calendar("jalali").locale("fa").format("dddd, MMMM")}</small>
                <div></div>
                <small>remain: {item.remain}</small>
              </div>
              <button onClick={() => handleProcess(item)}>
                {editingId === item.id ? 'Close' : 'Process'}
              </button>
            </div>

            {editingId === item.id && (
              <div className="form-overlay" style={{ marginTop: '15px', padding: '10px', background: '#f0f0f0' }}>
                {/* Form fields same as before... */}
                <label>Price: <input type="number" id="un-payment-price" value={form.price} onChange={handleFormChange} /></label>
                <JalaliDateInput
                  label="Date"
                  onDateChange={(val) => setForm({...form, paidAtDate: val})}
                  initialJalaliDate={form.paidAtDate}
                />
                <label>Category:
                  <select id="un-payment-category" value={form.category} onChange={handleFormChange}>
                    {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </label>
                <label>Description: 
                  <input type="text" id="un-payment-description" value={form.description} onChange={handleFormChange} />
                </label>
                <label>Owner:
                  <select id="un-payment-owner" value={form.owner} onChange={handleFormChange}>
                    {relatedUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </label>
                <button className="submit-btn" onClick={() => handleSubmit(item.id)}>Confirm & Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UncompletePaymentTab;
