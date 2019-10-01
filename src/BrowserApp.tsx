import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import App from './App';

function BrowserApp() {
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}

export default BrowserApp;
