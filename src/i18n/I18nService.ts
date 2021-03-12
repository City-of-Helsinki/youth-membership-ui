import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as H from 'history';
import countries from 'i18n-iso-countries';

import * as PathUtils from '../common/reactRouterWithLanguageSupport/pathUtils';
import Config from '../config';
import Logger from '../logger';
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
  const resources = locales.reduce((resources, locale) => {
    const resource = getLanguage(locale);

    return {
      ...resources,
      [locale]: {
        translation: resource,
      },
    };
  }, {});

  return resources;
}

function registerLocale(languageCode: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const language = require(`i18n-iso-countries/langs/${languageCode}.json`);

    countries.registerLocale(language);
  } catch (e) {
    Logger.error(
      `The i18n-iso-countries package does not have support for locale ${languageCode}`
    );
  }
}

function registerLocales(locales: string[]) {
  locales.forEach(locale => {
    registerLocale(locale);
  });
}

class I18nService {
  static get languages() {
    return [...defaultLanguages, ...Config.additionalLocales];
  }

  static init(history: H.History) {
    registerLocales(this.languages);

    const resources = getResources(this.languages);

    // Set languageChanged for direction event before initialization so
    // that direction is set on first load
    i18n.on('languageChanged', (nextLanguage: Language) => {
      // Sync selected languages direction into HTML document
      if (document) {
        document.dir = this.get().dir(nextLanguage);
      }
    });

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
      // If necessary, change language in pathname
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

  static dir(language?: string) {
    return i18n.dir(language);
  }
}

export default I18nService;
