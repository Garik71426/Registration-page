import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Provider } from "mobx-react";

import App from './App';
import stores from './stores';
import history from './api/history';
import init from './api/init';

init();

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={ history }>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);