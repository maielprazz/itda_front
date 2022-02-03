import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import '../src/assets/css/index.css';
import './assets/boxicons-2.0.9/css/boxicons.min.css';

import { Provider } from 'react-redux';
import store from './store';

document.title = 'MAA Data Analytics Portal';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
