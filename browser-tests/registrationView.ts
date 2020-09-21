import { login } from './utils/login';
import { testURL } from './utils/settings';
import { registrationFormSelector } from './pages/registrationFormSelector';
import { Selector } from 'testcafe';
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;

fixture('Test registration form').page(testURL());

/*
test('Test all required fields if user is adult', async t => {
  await login(t, 'adult');

  await t.click(registrationFormSelector.submitButton);

  const allRequiredErrors = await Selector(
    'div[class^="TextInput-module_helperText"]'
  ).count;

  await t.expect(allRequiredErrors).eql(6);
});

test('Test all required fields if user is minor', async t => {
  await login(t, 'minor');

  await t.click(registrationFormSelector.submitButton);

  const allRequiredErrors = await Selector(
    'div[class^="TextInput-module_helperText"]'
  ).count;

  await t.expect(allRequiredErrors).eql(10);
});


 */
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
    .typeText(registrationFormSelector.approverFirstName, 'Unique')
    .typeText(registrationFormSelector.approverLastName, 'User')
    .typeText(registrationFormSelector.approverEmail, 'unique@user.fi')
    .typeText(registrationFormSelector.approverPhone, '0501234567')
    // Extra fields -> Address
    .click(registrationFormSelector.addAddress)
    .click(registrationFormSelector.removeAddress)
    .click(registrationFormSelector.addAddress)
    .typeText(registrationFormSelector.addressAddress, 'Test street 202')
    .typeText(registrationFormSelector.addressPostalCode, '00100')
    .typeText(registrationFormSelector.addressCity, 'Helsinki')
    // Extra fields -> Guardian
    .click(registrationFormSelector.addGuardian)
    .click(registrationFormSelector.removeGuardian)
    .click(registrationFormSelector.addGuardian)
    .typeText(registrationFormSelector.additionalApproverFirstName, 'Ursula')
    .typeText(registrationFormSelector.additionalApproverLastName, 'User')
    .typeText(
      registrationFormSelector.additionalApproverEmail,
      'ursula@user.fi'
    )
    .typeText(registrationFormSelector.additionalApproverPhone, '0501234567');
});
