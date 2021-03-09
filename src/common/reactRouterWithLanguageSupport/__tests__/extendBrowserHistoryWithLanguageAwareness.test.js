import { createBrowserHistory } from 'history';

import extendBrowserHistoryWithLanguageAwareness from '../extendBrowserHistoryWithLanguageAwareness';

describe('extendBrowserHistoryWithLanguageAwareness', () => {
  const testHistory = createBrowserHistory();
  const spies = {
    push: jest.spyOn(testHistory, 'push'),
    replace: jest.spyOn(testHistory, 'replace'),
  };
  const extendedHistory = extendBrowserHistoryWithLanguageAwareness(
    testHistory
  );

  function testHistoryFunction(name) {
    return describe(`should extend ${name} with language support`, () => {
      it('should add language to pathname by default', () => {
        extendedHistory[name]('/accessibility');

        expect(spies[name]).toHaveBeenLastCalledWith('/fi/accessibility');
      });

      it('should allow language support to be toggled off', () => {
        extendedHistory[name]('/accessibility', null, false);

        expect(spies[name]).toHaveBeenLastCalledWith('/accessibility');
      });

      it('should allow language support to be forced to use a certain language', () => {
        extendedHistory[name]('/accessibility', null, 'fr');

        expect(spies[name]).toHaveBeenLastCalledWith('/fr/accessibility');
      });
    });
  }

  testHistoryFunction('push');

  testHistoryFunction('replace');
});
