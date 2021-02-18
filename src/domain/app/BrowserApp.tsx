import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

// i18n should be loaded before the application so that yup schemas are
// ready before schemas are created
import i18n from '../../i18n/i18nInit';
import App from './App';

function BrowserApp() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default BrowserApp;
