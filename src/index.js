import React from 'react';
import ReactDOM from 'react-dom';

// css styling
import './style/index.sass';
import './style/mathquill/mathquill.scss'   // mathquill styling
import 'grapick/dist/grapick.min.css'   // grapick styling

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
