import Config from '../config';

describe('Config service', () => {
  let env = {};

  beforeEach(() => {
    env = process.env;
  });

  afterEach(() => {
    process.env = env;
  });

  describe('additionalLanguages', () => {
    // eslint-disable-next-line max-len
    it('should return an empty array when REACT_APP_ADDITIONAL_LOCALES and REACT_APP_FEATURE_FLAG_USE_ADDITIONAL_LOCALES are not defined', () => {
      delete process.env.REACT_APP_ADDITIONAL_LOCALES;
      delete process.env.REACT_APP_FEATURE_FLAG_USE_ADDITIONAL_LOCALES;

      expect(Config.additionalLocales).toEqual([]);

      process.env.REACT_APP_ADDITIONAL_LOCALES = '';

      expect(Config.additionalLocales).toEqual([]);

      process.env.REACT_APP_ADDITIONAL_LOCALES = undefined;

      expect(Config.additionalLocales).toEqual([]);
    });

    it('should return additional languages as a string array', () => {
      process.env.REACT_APP_ADDITIONAL_LOCALES = 'fr,ru,et,so,ar';

      expect(Config.additionalLocales).toEqual(['fr', 'ru', 'et', 'so', 'ar']);

      process.env.REACT_APP_ADDITIONAL_LOCALES = 'fr, ru, et, so, ar';

      expect(Config.additionalLocales).toEqual(['fr', 'ru', 'et', 'so', 'ar']);
    });

    it('should return additional languages when the feature flag use additional languages is up', () => {
      process.env.REACT_APP_FEATURE_FLAG_USE_ADDITIONAL_LOCALES = true;

      expect(Config.additionalLocales).toEqual(['fr', 'ru', 'et', 'so', 'ar']);
    });
  });
});
