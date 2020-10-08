import { Selector } from 'testcafe';

export const membershipInformationSelector = {
  qrCode: Selector('canvas[id="react-qrcode-logo"]'),
  linkToProfile: Selector('a').withText('Show profile information'),
  name: Selector('span').withText('Existing TestProfile'),
  mainAddress: Selector('strong')
    .withText('Address')
    .sibling('span'),
  secondAddress: Selector('strong')
    .withText('Address 2')
    .sibling('span'),
  phone: Selector('strong')
    .withText('Phone')
    .sibling('span'),
  school: Selector('strong')
    .withText('School')
    .sibling('span'),
  photoUsage: Selector('strong')
    .withText('Photo usage approved')
    .sibling('span'),
  approvers: Selector('h2')
    .withText('Approver information')
    .sibling('div'),
  editProfileButton: Selector('a[class^="hds-button"]').withText(
    'Edit information'
  ),
};
