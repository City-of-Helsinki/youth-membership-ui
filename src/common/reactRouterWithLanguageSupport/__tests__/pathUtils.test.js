import * as PathUtils from '../pathUtils';

describe('PathUtils', () => {
  describe('getPathnameWithLanguage', () => {
    it('should add language to pathname', () => {
      expect(PathUtils.getPathnameWithLanguage('/accessibility', 'fi')).toEqual(
        '/fi/accessibility'
      );
    });
  });

  describe('getLocationWithLanguage', () => {
    it("should add language to the location object's pathname", () => {
      expect(
        PathUtils.getLocationWithLanguage(
          {
            pathname: '/accessibility',
          },
          'fi'
        ).pathname
      ).toEqual('/fi/accessibility');
    });
  });

  describe('getLocationFactoryWithLanguage', () => {
    // eslint-disable-next-line max-len
    it("should return a function that generates a location object with the language injected into it's pathname field", () => {
      const locationFactory = PathUtils.getLocationFactoryWithLanguage(
        location => location,
        'fi'
      );

      expect(locationFactory({ pathname: '/accessibility' }).pathname).toEqual(
        '/fi/accessibility'
      );
    });
  });

  describe('getPathWithLanguage', () => {
    it('should return the path as is if it is falsy', () => {
      expect(PathUtils.getPathWithLanguage(null)).toEqual(null);
    });

    describe('when path is a string', () => {
      it('should return the original path and a path with the language parameter', () => {
        expect(PathUtils.getPathWithLanguage('/accessibility')).toEqual([
          '/accessibility',
          '/:language/accessibility',
        ]);
      });
    });

    describe('when path is a string array', () => {
      it('should return an array containing the original paths and their language aware counterparts', () => {
        expect(
          PathUtils.getPathWithLanguage(['/accessibility', '/a11y'])
        ).toEqual([
          '/accessibility',
          '/a11y',
          '/:language/accessibility',
          '/:language/a11y',
        ]);
      });

      it('should not add transform path that are already langauge aware', () => {
        expect(
          PathUtils.getPathWithLanguage(['/:language/accessibility', '/a11y'])
        ).toEqual(['/:language/accessibility', '/a11y', '/:language/a11y']);
      });
    });
  });

  describe('replaceLanguageInPath', () => {
    it('should replace the language parameter', () => {
      expect(
        PathUtils.replaceLanguageInPath('/sv/accessibility', 'fi')
      ).toEqual('/fi/accessibility');
    });
  });

  describe('getIsLanguageInPath', () => {
    it('should return false when pathname is falsy', () => {
      expect(PathUtils.getIsLanguageInPath(null)).toEqual(false);
    });

    it('should return true when language is in path', () => {
      expect(PathUtils.getIsLanguageInPath('/sv/')).toEqual(true);
    });

    it('should return false when language is not in path', () => {
      expect(PathUtils.getIsLanguageInPath('/callback')).toEqual(false);
    });
  });
});
