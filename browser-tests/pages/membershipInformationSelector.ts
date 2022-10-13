import { Selector } from 'testcafe';

export const membershipInformationSelector = {
  qrCode: Selector('canvas[id="react-qrcode-logo"]'),
  approverEmailSent: Selector('h1').withText(
    'The application has been sent to your guardian for approval!'
  ),
  resendApprovalEmai: Selector('button').withText(
    'Resend the membership request'
  ),
  displayApplication: Selector('a[class^="hds-button"]'),
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
    .sibling('div')
    .child(),
  editProfileButton: Selector('a[class^="hds-button"]').withText(
    'Edit information'
  ),
  goBack: Selector('a[class^="hds-button"]'),
};
