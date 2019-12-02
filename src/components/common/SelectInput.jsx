import React from 'react';

const SelectInput = ({
  name,
  label,
  desc,
  error,
  options,
  className,
  disabled,
  onMouseEnter,
  ...rest
}) => (
  <div onMouseEnter={onMouseEnter} className={`ui select ${className}`}>
    <label htmlFor={name}>{label}</label>
    <div>{desc}</div>
    <select {...rest} disabled={disabled} name={name}>
      {options != null
        ? options.map((op) => (
          <option value={op._id} key={op._id}>
              {op.name}
            </option>
        ))
        : null}
    </select>
    {error && <p className='errorMsg'>{error}</p>}
  </div>
);

export default SelectInput;
