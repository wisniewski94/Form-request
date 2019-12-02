import React from 'react';

const Input = ({
 name, label, desc, error, className, disabled, onMouseEnter, ...rest 
}) => (
  <div onMouseEnter={onMouseEnter} className={`input transparent ${className}`}>
    <label htmlFor={name}>{label}</label>
    <div>{desc}</div>
    <input {...rest} disabled={disabled} name={name} />
    {error && <p className='errorMsg'>{error}</p>}
  </div>
);

export default Input;
