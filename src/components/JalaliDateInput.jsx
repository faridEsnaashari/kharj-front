import React, { useState, useEffect } from 'react';
import {date} from '../utils/date';

const JalaliDateInput = ({ label, onDateChange, initialJalaliDate }) => {
  const [jalaliDate, setJalaliDate] = useState(
    initialJalaliDate || date().calendar('jalali').format("YYYY-MM-DD HH:mm:ss")
  );
  //console.log(jalaliDate)

  useEffect(() => {
    onDateChange(jalaliDate);
  }, [jalaliDate]);

  const handleChange = (e) => {
    const newJalaliDate = e.target.value;
    
    const isValid = date(newJalaliDate, "YYYY-MM-DD HH:mm:ss", true).isValid();

    if (isValid || newJalaliDate === '') {
      setJalaliDate(newJalaliDate);
    } 
  };

  return (
    <label>
      {label}:
      <input 
        type="text" 
//        placeholder={JALALI_FORMAT} 
        value={jalaliDate} 
        onChange={handleChange} 
      />
    </label>
  );
};
export default JalaliDateInput;
