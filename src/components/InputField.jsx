import React from 'react';

import '../styles/InputField.css'

function InputField ({field, isPassWord, setData, value = ''}) {

    return (
        <div className='input-container'>
            <input type={isPassWord ? 'password': 'text'} name={field} value={value} required onChange={(e) => setData(e.target.value)}/>
            <label htmlFor={field}>{field}</label>
        </div>
    );
}

export default InputField;