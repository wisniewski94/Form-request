import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class MainForm extends Form {
  state = {
    data: {
      city: '',
    },
    disabled: { city: false },
    errors: {},
  };

  config = {
    city: Joi.string()
      .required()
      .regex(/^[a-zA-Z\s]+$/)
      .label('City name'),
  };

  schema = Joi.object(this.config);

  doSubmit = () => {
    console.log('SUBMIT');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('city', 'City', 'Enter city name to view forecast.')}
        {this.renderButton('View')}
      </form>
    );
  }
}

export default MainForm;
