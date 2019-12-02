/* eslint-disable no-restricted-syntax */
import Joi from 'joi-browser';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import Input from './Input';
import Checkbox from './CheckBox';
import SelectInput from './SelectInput';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: {}, errors: {} };
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onMouseEnter(event) {
    const values = { ...this.state.data };
    const { disabled } = this.state;
    if (_.isEmpty(values)) {
      const { childNodes } = event.currentTarget;
      const nodes = [...childNodes];
      const input = nodes.find((el) => el.name !== undefined);
      const data = { ...disabled };
      data[input.name] = false;
      this.setState({ disabled: data });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
    const state = { ...this.state.data };
    const data = _.chain(state)
      .mapValues((val) => (val = ''))
      .value();
    this.setState({ data });
  };

  handleChange = ({ currentTarget: input }) => {
    const { errors } = this.state;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSelectChange = ({ currentTarget: input }) => {
    console.log(input);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.config[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const { data } = this.state;
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
      if (item.path.length === 0) {
        item.context.peers.forEach((el) => {
          errors[el] = item.message;
        });
      }
    }
    return errors;
  };

  renderInput = (name, label, desc, type = 'text', placeholder) => {
    const { errors, data, disabled } = this.state;
    return (
      <Input
        className={(disabled[name] ? 'disabled' : '', errors[name] ? 'error' : '')}
        disabled={!!disabled[name]}
        label={label}
        name={name}
        desc={desc}
        type={type}
        placeholder={placeholder}
        value={data[name]}
        onChange={this.handleChange}
        onMouseEnter={this.onMouseEnter}
        error={errors[name]}
      />
    );
  };

  renderLabel = (title, desc) => (
    <div className='label'>
      <span>{title}</span>
      <div>{desc}</div>
    </div>
  );

  renderSelectInput = (name, label, desc, options) => {
    const { errors, data, disabled } = this.state;
    return (
      <SelectInput
        className={`${disabled[name] ? 'disabled' : ''} ${errors[name] ? 'error' : ''}`}
        disabled={disabled[name]}
        label={label}
        value={data[name]}
        desc={desc}
        name={name}
        options={options}
        onChange={this.handleChange}
        onMouseEnter={this.onMouseEnter}
        error={errors[name]}
      />
    );
  };

  renderButton = (label) => (
    <button type='submit' className='ui blue'>
      {label}
    </button>
  );

  renderCheckbox = (name, value, label, type = 'checkbox') => {
    const { errors, disabled, data } = this.state;
    return (
      <Checkbox
        className={`${disabled[name] ? 'disabled' : ''} ${errors[name] ? 'error' : ''}`}
        label={label}
        name={name}
        type={type}
        checked={data[name] === value}
        value={value}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
