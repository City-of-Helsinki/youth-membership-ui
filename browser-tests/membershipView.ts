import { testURL } from './utils/settings';
import { loginStraight } from './utils/login';
import { membershipInformationSelector } from './pages/membershipInformationSelector';

fixture('Membership information').page(testURL());

test('Enter profile information page', async t => {
  await loginStraight(t);

  await t
    .click(membershipInformationSelector.linkToProfile)
    .expect(membershipInformationSelector.name.exists)
    .ok()
    .expect(membershipInformationSelector.mainAddress.exists)
    .ok()
    .expect(membershipInformationSelector.secondAddress.exists)
    .ok()
    .expect(membershipInformationSelector.approvers.count)
    .eql(2);
});
