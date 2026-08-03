import JalaliDateInput from '../JalaliDateInput'; 

const IncomeComponent=({setForm,form,relatedUsers,categoryOptions,unitOptions,id,handleSubmit})=>{
  return (

    <div className="form-overlay" style={{ marginTop: '15px', padding: '10px', background: '#e5f2de', color:"#5f605e" }}>
                {/* Form fields same as before... */}
                <label>Price: <input type="number" id="un-payment-price" value={form.price} onChange={(e)=>setForm({...form,amount:e.target.value})} /></label>
                <JalaliDateInput
                  label="Date"
                  onDateChange={(val) => setForm({...form, paidAtDate: val})}
                  initialJalaliDate={form.paidAtDate}
                />
                <label>Category:
                  <select id="un-payment-category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
                    {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </label>
                <label>Description: 
                  <input type="text" id="un-payment-description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
                </label>
                <label>Owner:
                  <select id="un-payment-owner" value={form.owner} onChange={(e)=>setForm({...form,owner:e.target.value})}>
                    {relatedUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </label>
                <label>Unit:
                  <select id="un-payment-owner" value={form.unit} onChange={(e)=>setForm({...form,unit:e.target.value})}>
                    {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </label>
                <button className="submit-btn" onClick={() => handleSubmit(id)}>Confirm & Submit</button>
              </div>

  )
}

export default IncomeComponent
