import { testURL } from './utils/settings';
import { openCityProfileServiceClientId } from './opencityprofile/services';

fixture('Edit profile information').page(testURL());

test('Ensure open city profile client id', async (t) => {
  await openCityProfileServiceClientId(t);
});
