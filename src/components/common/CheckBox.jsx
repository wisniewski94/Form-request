import React from 'react';

const CheckBox = ({
 name, label, error, className, type, ...rest 
}) => (
  <div className={`ui ${type} ${className}`}>
    <input type={type} {...rest} name={name} />
    <label htmlFor={name}>{label}</label>
    {error && <p className='errorMsg'>{error}</p>}
  </div>
);

export default CheckBox;
