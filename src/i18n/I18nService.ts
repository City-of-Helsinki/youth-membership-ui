import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import history from '../domain/app/appHistory';
import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';
import setYupLocale from './setYupLocale';

const supportedLanguages = ['fi', 'sv', 'en'];
export type Language = typeof supportedLanguages[number];

class I18nService {
  static languages = supportedLanguages;

  static init() {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: en,
          },
          fi: {
            translation: fi,
          },
          sv: {
            translation: sv,
          },
        },
        fallbackLng: 'fi',
        whitelist: I18nService.languages,
        detection: {
          order: ['localStorage', 'path'],
          lookupFromPathIndex: 0,
          checkWhitelist: true,
        },
        interpolation: {
          escapeValue: false,
        },
      });

    setYupLocale();

    i18n.on('languageChanged', (nextLanguage: Language) => {
      const pathname = history.location.pathname;
      const containsLanguage = this.languages.reduce(
        (contains, language) => contains || pathname.includes(`/${language}/`),
        false
      );

      if (containsLanguage) {
        const nextPathname = pathname.split('/');
        // Replace language with next language
        nextPathname.splice(1, 1, nextLanguage);

        history.replace(nextPathname.join('/'));
      }
    });
  }

  static get() {
    return i18n;
  }

  static get language(): Language {
    return i18n.language as Language;
  }
}

export default I18nService;
