import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import BrowserApp from './BrowserApp';
import * as serviceWorker from './serviceWorker';
import userManager from './auth/userManager';

if (window && window.location.pathname === '/silent_renew') {
  userManager.signinSilentCallback();
} else {
  ReactDOM.render(<BrowserApp />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
