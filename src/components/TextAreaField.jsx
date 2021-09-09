import React from 'react';

import '../styles/TextAreaField.css'

function TextAreaField ({field, setData, value=''}) {

    return (
        <div className='textarea-container'>
            <textarea rows='5' cols='60' name={field} value={value} required onChange={(e) => setData(e.target.value)}/>
            <label htmlFor={field}>{field}</label>
        </div>
    );
}

export default TextAreaField;