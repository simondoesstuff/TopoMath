import React from 'react';
import ReactDOM from 'react-dom';

// css styling

import './style/mathquill/mathquill.scss';  // mathquill
import './style/reGrapick.sass';            // reGrapick

import './style/index.sass';                // general
import './style/info-modal.sass';           // info modal
import './style/settings-dropdown.sass';    // settings gear
import './style/control-bar.sass';    // control bar

// jsx

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
