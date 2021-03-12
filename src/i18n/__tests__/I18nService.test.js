import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import setYupLocale from '../setYupLocale';
import I18nService from '../I18nService';

jest.mock('../setYupLocale');

describe('I18nService', () => {
  it('static language getter should return current language', () => {
    expect(I18nService.language).toEqual('fi');

    // Change language
    I18nService.get().changeLanguage('sv');

    expect(I18nService.language).toEqual('sv');

    I18nService.get().changeLanguage('fi');
  });

  it('static languages getter should return supported languages', () => {
    expect(I18nService.languages).toEqual([
      'fi',
      'sv',
      'en',
      'fr',
      'ru',
      'et',
      'so',
      'ar',
    ]);
  });

  it('static get should return the i18next instance', () => {
    expect(i18n).toEqual(I18nService.get());
  });

  describe('static method dir', () => {
    it('static dir should return direction of language', () => {
      expect(I18nService.dir('fi')).toEqual('ltr');
      expect(I18nService.dir('ar')).toEqual('rtl');
    });

    it('static dir should return direction of current language if there are no arguments', () => {
      expect(I18nService.language).toEqual('fi');
      expect(I18nService.dir()).toEqual('ltr');
    });
  });

  describe('static init', () => {
    const replace = jest.fn();
    const fakeHistory = {
      replace,
    };

    it('should set up yup language features', () => {
      I18nService.init(fakeHistory);

      expect(setYupLocale).toHaveBeenCalledTimes(1);
    });

    it('should extend the language change functionality by changing the language in the url', () => {
      const originalWindow = window.location;
      delete window.location;
      window.location = new URL('http://localhost/fi/');

      const i18nOn = jest.spyOn(i18n, 'on');

      I18nService.init(fakeHistory);

      expect(i18nOn).toHaveBeenCalledWith(
        'languageChanged',
        expect.any(Function)
      );

      const languageChangeCallbackFunction = i18nOn.mock.calls[0][1];

      languageChangeCallbackFunction('sv');

      expect(replace).toHaveBeenCalledWith('/sv/');

      delete window.location;
      window.location = originalWindow;
    });

    it('should configure i18next', () => {
      const useSpy = jest.spyOn(i18n, 'use');
      const initSpy = jest.spyOn(i18n, 'init');

      I18nService.init(fakeHistory);

      expect(useSpy).toHaveBeenCalledWith(LanguageDetector);
      expect(useSpy).toHaveBeenCalledWith(initReactI18next);
      expect(initSpy).toHaveBeenCalledTimes(1);

      const initParams = initSpy.mock.calls[0][0];

      expect(initParams.resources).toEqual({
        fi: expect.any(Object),
        sv: expect.any(Object),
        en: expect.any(Object),
        fr: expect.any(Object),
        ru: expect.any(Object),
        et: expect.any(Object),
        so: expect.any(Object),
        ar: expect.any(Object),
      });
      expect(initParams.fallbackLng).toEqual(['fi']);
      expect(initParams.whitelist).toEqual([
        ...I18nService.languages,
        'cimode',
      ]);
    });
  });
});
