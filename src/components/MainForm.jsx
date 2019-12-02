import React, { Component } from 'react';
import BaseJoi from 'joi-browser';
import Extension from 'joi-date-extensions';
import Form from './common/Form';
import '../styles/MainForm.sass';
import { postRaportReq } from '../services/movieService';

const Joi = BaseJoi.extend(Extension);

class MainForm extends Form {
  state = {
    data: {
      raport: '',
      format: 'excel',
      email: '',
      schedule: 'norepeat',
      weekDays: 'Monday',
      daily: '',
      specificDate: '',
      specificTime: '',
      weekTime: '',
    },
    disabled: { city: false },
    errors: {},
  };

  config = {
    raport: Joi.string()
      .required()
      .regex(/^[a-zA-Z\s]+$/)
      .label('Raport'),
    format: Joi.string()
      .required()
      .label('Format'),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label('E-mail'),
    schedule: Joi.string()
      .required()
      .label('Schedule'),
    weekDays: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .label('Week day'),
    daily: Joi.date()
      .format('HH:mm')
      .allow('')
      .label('Daily hour'),
    specificDate: Joi.date()
      .allow('')
      .label('Specific Date'),
    specificTime: Joi.date()
      .format('HH:mm')
      .allow('')
      .label('Specific Time'),
    weekTime: Joi.date()
      .format('HH:mm')
      .allow('')
      .label('Specific Week Time'),
  };

  schema = Joi.object(this.config).options({ raw: true });

  doSubmit = () => {
    const { data } = this.state;
    const submit = { ...data };
    switch (submit.schedule) {
      case 'norepeat':
        submit.specificDate = '';
        submit.specificTime = '';
        submit.daily = '';
        submit.weekDays = '';
        submit.weekTime = '';
        break;
      case 'specific':
        submit.daily = '';
        submit.weekDays = '';
        submit.weekTime = '';
        break;
      case 'daily':
        submit.specificDate = '';
        submit.specificTime = '';
        submit.weekDays = '';
        submit.weekTime = '';
        break;
      case 'weekly':
        submit.daily = '';
        submit.weekDays = '';
        submit.weekTime = '';
        break;
      default:
        console.log(
          'I know this is not the best way to operate on data. I should work on validation more. And switch is not performant enough',
        );
    }
    console.log(submit);
    postRaportReq(submit);
  };

  render() {
    const { schedule } = this.state.data;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput(
          'raport',
          'Raport Name',
          'Enter a name for the raport.',
          'text',
          'Shareablee Raport',
        )}
        {this.renderLabel('Format', 'Raport file format')}
        {this.renderCheckbox('format', 'excel', 'Excel', 'radio')}
        {this.renderCheckbox('format', 'csv', 'CSV', 'radio')}
        {this.renderInput(
          'email',
          'E-mail',
          'E-mail address that will be used to receive raports',
          'email',
          'example@example.com',
        )}
        {this.renderLabel('Schedule', '')}
        {this.renderCheckbox('schedule', 'norepeat', 'No Repeat', 'radio')}
        {this.renderCheckbox('schedule', 'specific', 'Specific Date', 'radio')}
        {this.renderCheckbox('schedule', 'daily', 'Daily', 'radio')}
        {this.renderCheckbox('schedule', 'weekly', 'Weekly', 'radio')}
        {schedule === 'daily' ? (
          <>
            {this.renderLabel('Everyday at', '')}
            <div className='daily'>{this.renderInput('daily', '', '', 'time')}</div>
          </>
        ) : (
          ''
        )}
        {schedule === 'specific' ? (
          <>
            {this.renderLabel('Date', '')}
            <div className='specific'>
              {this.renderInput('specificDate', '', '', 'date')}
              <span>at</span>
              {this.renderInput('specificTime', '', '', 'time')}
            </div>
          </>
        ) : (
          ''
        )}
        {schedule === 'weekly' ? (
          <>
            {this.renderLabel('Every', '')}
            <div className='specific'>
              {this.renderSelectInput('weekDays', '', '', [
                { _id: 'monday', name: 'Monday' },
                { _id: 'tuesday', name: 'Tuesday' },
                { _id: 'wednesday', name: 'Wednesday' },
                { _id: 'thursday', name: 'Thursday' },
                { _id: 'friday', name: 'Friday' },
                { _id: 'saturday', name: 'Saturday' },
                { _id: 'sunday', name: 'Sunday' },
              ])}
              <span>at</span>
              {this.renderInput('weekTime', '', '', 'time')}
            </div>
          </>
        ) : (
          ''
        )}
        {this.renderButton('Submit')}
      </form>
    );
  }
}

export default MainForm;
