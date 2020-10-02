import { Selector } from 'testcafe';

import { login } from './utils/login';
import { testURL } from './utils/settings';
import { registrationFormSelector } from './pages/registrationFormSelector';
import { membershipInformationSelector } from './pages/membershipInformationSelector';

fixture('Test registration form').page(testURL());

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
  await login(t, 'adult');

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
    .typeText(registrationFormSelector.approverEmail, 'unique@user.fi')
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
    .expect(membershipInformationSelector.qrCode.exists)
    .ok();
});
