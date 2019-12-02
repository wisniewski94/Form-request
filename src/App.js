/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './styles/App.sass';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import keyboardui from 'keyboard-ui';
import { ToastContainer } from 'react-toastify';
import MainForm from './components/MainForm';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    fontConfig: {
      google: {
        families: ['Playfair Display: 900', 'Playfair Display: 500', 'Noto Sans KR'],
      },
    },
  };

  render() {
    return (
      <WebfontLoader config={this.state.fontConfig}>
        <div id='content'>
          <ToastContainer />

          <MainForm />
        </div>
      </WebfontLoader>
    );
  }
}

export default App;
