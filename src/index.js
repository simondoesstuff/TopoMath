import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.sass';
import './style/mathquill/mathquill.scss'   // mathquill styling

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
