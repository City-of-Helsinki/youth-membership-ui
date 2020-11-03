import { Selector } from 'testcafe';

export const registrationFormSelector = {
  firstName: Selector('input[name="firstName"]'),
  lastName: Selector('input[name="lastName"]'),
  primaryCountry: Selector('select[name="primaryAddress.countryCode"]'),
  countrySv: Selector('option').filter('[value="SE"]'),
  primaryAddress: Selector('input[name="primaryAddress.address"]'),
  primaryPostalCode: Selector('input[name="primaryAddress.postalCode"]'),
  primaryCity: Selector('input[name="primaryAddress.city"]'),
  phone: Selector('input[name="phone"]'),
  approverFirstName: Selector('input[name="approverFirstName"]'),
  approverLastName: Selector('input[name="approverLastName"]'),
  approverEmail: Selector('input[name="approverEmail"]'),
  approverPhone: Selector('input[name="approverPhone"]'),
  schoolName: Selector('input[name="schoolName"]'),
  schoolClass: Selector('input[name="schoolClass"]'),
  languageFinnish: Selector('label').withText('Finnish'),
  languageSwedish: Selector('label').withText('Swedish'),
  languageEnglish: Selector('label').withText('English'),
  photoUsageYes: Selector('label').withText('Yes'),
  photoUsageNo: Selector('label').withText('No'),
  addAddress: Selector('span[class^="Button-module_label"]').withText(
    'Add another address'
  ),
  removeAddress: Selector(
    'button[class^="arrayFieldTemplate_additionalActionButton"]'
  ).nth(0),
  addressAddress: Selector('input[name="addresses.0.address"]'),
  addressPostalCode: Selector('input[name="addresses.0.postalCode"]'),
  addressCity: Selector('input[name="addresses.0.city"]'),
  addGuardian: Selector('span[class^="Button-module_label"]').withText(
    "Add another guardian's information"
  ),
  removeGuardian: Selector(
    'button[class^="arrayFieldTemplate_additionalActionButton"]'
  ).nth(1),
  additionalApproverFirstName: Selector(
    'input[name="additionalContactPersons.0.firstName"]'
  ),
  additionalApproverLastName: Selector(
    'input[name="additionalContactPersons.0.lastName"]'
  ),
  additionalApproverEmail: Selector(
    'input[name="additionalContactPersons.0.email"]'
  ),
  additionalApproverPhone: Selector(
    'input[name="additionalContactPersons.0.phone"]'
  ),
  textInputErrors: Selector('div[class^="TextInput-module_helperText"]'),
  terms: Selector('input[type="checkbox"]'),
  submitButton: Selector('button[type="submit"]'),
};
