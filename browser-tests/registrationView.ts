import MailosaurClient from 'mailosaur/lib/mailosaur';
import { Selector } from 'testcafe';

import { getApproverUrl } from './utils/valueUtils';
import { login } from './utils/login';
import { mailosaurApiKey, mailosaurServerId, testURL } from './utils/settings';
import { registrationFormSelector } from './pages/registrationFormSelector';
import { membershipInformationSelector } from './pages/membershipInformationSelector';

const serverId = mailosaurServerId();
const client = new MailosaurClient(mailosaurApiKey());
const approverEmail = `unique-user@${serverId}.mailosaur.io`;

export const fillChild = async ( t: TestController ) => {
  await t
      // All normal fields
      .typeText(registrationFormSelector.firstName, 'Uno')
      .typeText(registrationFormSelector.lastName, 'User')
      .click(registrationFormSelector.primaryCountry)
      .click(registrationFormSelector.countrySv)
      .typeText(registrationFormSelector.primaryAddress, 'Test street 101')
      .typeText(registrationFormSelector.primaryPostalCode, '00200')
      .typeText(registrationFormSelector.primaryCity, 'Helsinki')
      .typeText(registrationFormSelector.phone, '0501234567')
      .typeText(registrationFormSelector.schoolName, 'Best school')
      .typeText(registrationFormSelector.schoolClass, '1C')
      // .click(registrationFormSelector.languageSwedish)
      // .click(registrationFormSelector.languageEnglish)
      // .click(registrationFormSelector.languageFinnish)
      // .click(registrationFormSelector.photoUsageYes)
      // .click(registrationFormSelector.photoUsageNo)
      .typeText(registrationFormSelector.approverFirstName, 'Unique')
      .typeText(registrationFormSelector.approverLastName, 'User')
      .typeText(registrationFormSelector.approverEmail, approverEmail)
      .typeText(registrationFormSelector.approverPhone, '0501234567');
  
    // Extra fields -> Address
    await t
      .click(registrationFormSelector.addAddress)
      .typeText(registrationFormSelector.addressAddress, 'Test street 202')
      .typeText(registrationFormSelector.addressPostalCode, '00100')
      .typeText(registrationFormSelector.addressCity, 'Helsinki');
  
    // Extra fields -> Guardian
    await t
      .click(registrationFormSelector.addGuardian)
      .typeText(registrationFormSelector.additionalApproverFirstName, 'Ursula')
      .typeText(registrationFormSelector.additionalApproverLastName, 'User')
      .typeText(
        registrationFormSelector.additionalApproverEmail,
        'ursula@user.fi'
      )
      .typeText(registrationFormSelector.additionalApproverPhone, '0501234567');
  
    // Accept terms and submit form
    await t
      .click(registrationFormSelector.terms)
      .click(registrationFormSelector.submitButton);
      // .expect(membershipInformationSelector.approverEmailSent.exists)
      // .ok();
};

// Skip for now because we do not have valid mailosaurus credentials
// anymore.
fixture
  .skip('Test registration form')
  .page(testURL())
  .beforeEach(async () => await client.messages.deleteAll(serverId));

test('Test all required fields if user is adult', async t => {
  await login(t, 'adult');

  await t.click(registrationFormSelector.submitButton);

  const allRequiredErrors = await Selector(
    'div[class^="TextInput-module_helperText"]'
  ).count;

  await t
    .expect(allRequiredErrors)
    .eql(6)
    .expect(registrationFormSelector.firstName.focused)
    .ok();
});

test('Test all required fields if user is minor', async t => {
  await login(t, 'minor');

  await t.click(registrationFormSelector.submitButton);

  const allRequiredErrors = await Selector(
    'div[class^="TextInput-module_helperText"]'
  ).count;

  await t
    .expect(allRequiredErrors)
    .eql(10)
    .expect(registrationFormSelector.firstName.focused)
    .ok();
});

test('Fill all form fields', async t => {
  await login(t, 'minor');

  await t
    // All normal fields
    .typeText(registrationFormSelector.firstName, 'Uno')
    .typeText(registrationFormSelector.lastName, 'User')
    .click(registrationFormSelector.primaryCountry)
    .click(registrationFormSelector.countrySv)
    .typeText(registrationFormSelector.primaryAddress, 'Test street 101')
    .typeText(registrationFormSelector.primaryPostalCode, '00200')
    .typeText(registrationFormSelector.primaryCity, 'Helsinki')
    .typeText(registrationFormSelector.phone, '0501234567')
    .typeText(registrationFormSelector.schoolName, 'Best school')
    .typeText(registrationFormSelector.schoolClass, '1C')
    .click(registrationFormSelector.languageSwedish)
    .click(registrationFormSelector.languageEnglish)
    .click(registrationFormSelector.languageFinnish)
    .click(registrationFormSelector.photoUsageYes)
    .click(registrationFormSelector.photoUsageNo)
    .typeText(registrationFormSelector.approverFirstName, 'Unique')
    .typeText(registrationFormSelector.approverLastName, 'User')
    .typeText(registrationFormSelector.approverEmail, approverEmail)
    .typeText(registrationFormSelector.approverPhone, '0501234567');

  // Extra fields -> Address
  await t
    .click(registrationFormSelector.addAddress)
    .expect(registrationFormSelector.addressAddress.exists)
    .ok()
    .click(registrationFormSelector.removeAddress)
    .expect(registrationFormSelector.addressAddress.exists)
    .notOk()
    .click(registrationFormSelector.addAddress)
    .typeText(registrationFormSelector.addressAddress, 'Test street 202')
    .typeText(registrationFormSelector.addressPostalCode, '00100')
    .typeText(registrationFormSelector.addressCity, 'Helsinki');

  // Extra fields -> Guardian
  await t
    .click(registrationFormSelector.addGuardian)
    .expect(registrationFormSelector.additionalApproverFirstName.exists)
    .ok()
    .click(registrationFormSelector.removeGuardian)
    .expect(registrationFormSelector.additionalApproverFirstName.exists)
    .notOk()
    .click(registrationFormSelector.addGuardian)
    .typeText(registrationFormSelector.additionalApproverFirstName, 'Ursula')
    .typeText(registrationFormSelector.additionalApproverLastName, 'User')
    .typeText(
      registrationFormSelector.additionalApproverEmail,
      'ursula@user.fi'
    )
    .typeText(registrationFormSelector.additionalApproverPhone, '0501234567');

  // Accept terms and submit form
  await t
    .click(registrationFormSelector.terms)
    .click(registrationFormSelector.submitButton)
    .expect(membershipInformationSelector.approverEmailSent.exists)
    .ok();

  // Wait for a while & hopefully email has been received
  await t.wait(10000);

  const message = await client.messages.get(serverId, {
    sentTo: approverEmail,
  });

  await t.expect(message.html).ok();
});

test('Youths profile is waiting for approval + approval + confirmation', async t => {
  await login(t, 'minor');

  await t
    .expect(membershipInformationSelector.approverEmailSent.exists)
    .ok()
    .click(membershipInformationSelector.displayApplication)
    .expect(membershipInformationSelector.mainAddress.exists)
    .ok()
    .click(membershipInformationSelector.goBack)
    .click(membershipInformationSelector.resendApprovalEmai);

  await t.wait(10000);

  const message = await client.messages.get(serverId, {
    sentTo: approverEmail,
  });

  // Move to approval page
  await t.navigateTo(await getApproverUrl(message));

  await t
    .selectText(registrationFormSelector.additionalApproverFirstName)
    .pressKey('delete')
    .selectText(registrationFormSelector.additionalApproverLastName)
    .pressKey('delete')
    .selectText(registrationFormSelector.additionalApproverEmail)
    .pressKey('delete')
    .selectText(registrationFormSelector.additionalApproverPhone)
    .pressKey('delete');

  await t
    .click(registrationFormSelector.submitButton)
    .expect(registrationFormSelector.textInputErrors.count)
    .eql(4)
    .click(
      Selector('button[class^="arrayFieldTemplate_additionalActionButton"]')
    )
    .click(registrationFormSelector.addGuardian)
    .typeText(registrationFormSelector.additionalApproverFirstName, 'Uriel')
    .typeText(registrationFormSelector.additionalApproverLastName, 'User')
    .typeText(
      registrationFormSelector.additionalApproverEmail,
      'uriel.user@mailinator.com'
    )
    .typeText(registrationFormSelector.additionalApproverPhone, '0501234567')
    .click(registrationFormSelector.terms)
    .click(registrationFormSelector.submitButton);

  await t
    .navigateTo(testURL())
    .expect(membershipInformationSelector.qrCode.exists)
    .ok();
});
