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
    it('should return an empty array when REACT_APP_ADDITIONAL_LOCALES is not defined', () => {
      delete process.env.REACT_APP_ADDITIONAL_LOCALES;

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
  });
});
