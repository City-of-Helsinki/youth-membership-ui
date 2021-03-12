import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as H from 'history';

import * as PathUtils from '../common/reactRouterWithLanguageSupport/pathUtils';
import Config from '../config';
import Logger from '../logger';
import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';
import setYupLocale from './setYupLocale';

const defaultLanguages = ['fi', 'sv', 'en'];
export type Language = string;

function getLanguage(languageCode: string) {
  let resource;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    resource = require(`./${languageCode}.json`);
  } catch (e) {
    Logger.error(`Missing translations for locale ${languageCode}`);
  } finally {
    return resource;
  }
}

function getResources(locales: string[]) {
  const defaultResources = {
    en: {
      translation: en,
    },
    fi: {
      translation: fi,
    },
    sv: {
      translation: sv,
    },
  };
  const additionalResources = locales.reduce((additionalResources, locale) => {
    const resource = getLanguage(locale);

    return {
      ...additionalResources,
      [locale]: {
        translation: resource,
      },
    };
  }, {});

  return { ...defaultResources, ...additionalResources };
}

class I18nService {
  static get languages() {
    return [...defaultLanguages, ...Config.additionalLocales];
  }

  static init(history: H.History) {
    const resources = getResources(this.languages);

    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'fi',
        whitelist: this.languages,
        detection: {
          order: ['path', 'localStorage'],
          lookupFromPathIndex: 0,
          // Don't allow unsupported languages to be detected because
          // the language parameter may be missing in some urls in which
          // case i18next's language value will receive an insensible
          // value such as "callback".
          checkWhitelist: true,
        },
        interpolation: {
          escapeValue: false,
        },
      });

    setYupLocale();

    i18n.on('languageChanged', (nextLanguage: Language) => {
      const pathname = window.location.pathname;
      const containsLanguage = this.languages.reduce(
        (contains, language) => contains || pathname.includes(`/${language}/`),
        false
      );

      if (containsLanguage) {
        const nextPathname = PathUtils.replaceLanguageInPath(
          pathname,
          nextLanguage
        );

        history.replace(nextPathname);
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
