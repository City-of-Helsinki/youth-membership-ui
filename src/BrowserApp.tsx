import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import i18n from './i18n/i18nInit';
import createStore from './redux/store';

const store = createStore({
  devTools: process.env.NODE_ENV !== 'production',
});

function BrowserApp() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App store={store} />
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default BrowserApp;
