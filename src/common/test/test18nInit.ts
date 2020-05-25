import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fi from '../../i18n/fi.json';
import en from '../../i18n/en.json';
import sv from '../../i18n/sv.json';

i18n.use(initReactI18next).init({
  lng: 'fi',
  fallbackLng: 'fi',
  resources: {
    fi: {
      translation: fi,
    },
    en: {
      translation: en
    },
    sv: {
      translation: sv
    }
  },
});

export default i18n;
