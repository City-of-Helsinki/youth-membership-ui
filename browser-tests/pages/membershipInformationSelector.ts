import { Selector } from 'testcafe';

export const membershipInformationSelector = {
  qrCode: Selector('canvas[id="react-qrcode-logo"]'),
  linkToProfile: Selector('a').withText('Show profile information'),
  name: Selector('span').withText('Uno User'),
  mainAddress: Selector('span').withText(
    'Test street 101, 00200, Helsinki, Sweden'
  ),
  secondAddress: Selector('span').withText(
    'Test street 202, 00100, Helsinki, Finland'
  ),
  approvers: Selector('h2')
    .withText('Approver information')
    .sibling('div'),
};
