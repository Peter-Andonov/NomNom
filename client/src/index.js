import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import Navigation from './Navigation';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Navigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

