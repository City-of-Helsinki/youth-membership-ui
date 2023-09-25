import { testURL } from './utils/settings';
import { openCityProfileServiceClientId } from './opencityprofile/services';

fixture('Ensure open city profile client id').page(testURL());

test('Ensure open city profile client id', async (t) => {
  await openCityProfileServiceClientId(t);
});
