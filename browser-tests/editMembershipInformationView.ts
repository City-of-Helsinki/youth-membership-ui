import { testURL } from './utils/settings';
import { loginStraight } from './utils/login';
import { membershipInformationSelector } from './pages/membershipInformationSelector';
import { registrationFormSelector } from './pages/registrationFormSelector';

fixture('Edit profile information').page(testURL());

const fillAddressAndPhone = async (
  t: TestController,
  address: string,
  postalCode: string,
  city: string,
  phone: string
) => {
  await t
    .selectText(registrationFormSelector.primaryAddress)
    .typeText(registrationFormSelector.primaryAddress, address)
    .selectText(registrationFormSelector.primaryPostalCode)
    .typeText(registrationFormSelector.primaryPostalCode, postalCode)
    .selectText(registrationFormSelector.primaryCity)
    .typeText(registrationFormSelector.primaryCity, city)
    .selectText(registrationFormSelector.phone)
    .typeText(registrationFormSelector.phone, phone);
};

const expectedValues = async (
  t: TestController,
  mainAddress: string,
  phone: string,
  photoUsage: string,
  school: string
) => {
  await t
    .expect(membershipInformationSelector.mainAddress.innerText)
    .eql(mainAddress)
    .expect(membershipInformationSelector.phone.innerText)
    .eql(phone)
    .expect(membershipInformationSelector.photoUsage.innerText)
    .eql(photoUsage)
    .expect(membershipInformationSelector.school.innerText)
    .eql(school);
};

test('Edit profile information', async t => {
  await loginStraight(t);

  await t
    .click(membershipInformationSelector.linkToProfile)
    .click(membershipInformationSelector.editProfileButton);

  // Make changes to information
  await fillAddressAndPhone(
    t,
    'Space street',
    '00000',
    'MoonCity',
    '7654321050'
  );
  await t
    .click(registrationFormSelector.photoUsageYes)
    .typeText(registrationFormSelector.schoolName, 'Solution office')
    .typeText(registrationFormSelector.schoolClass, 'Team-C')
    .click(registrationFormSelector.submitButton);

  // Make sure information was changed
  await expectedValues(
    t,
    'Space street, 00000, MoonCity, Sweden',
    '7654321050',
    'Yes',
    'Solution office, Team-C'
  );

  // Change everything back. This way we can actually make sure that information is changed every time

  await t.click(membershipInformationSelector.editProfileButton);
  await fillAddressAndPhone(
    t,
    'Test street 101',
    '00200',
    'Helsinki',
    '0501234567'
  );
  await t
    .click(registrationFormSelector.photoUsageNo)
    .selectText(registrationFormSelector.schoolName)
    .pressKey('delete')
    .selectText(registrationFormSelector.schoolClass)
    .pressKey('delete')
    .click(registrationFormSelector.submitButton);

  // Check that information was changed back
  await expectedValues(
    t,
    'Test street 101, 00200, Helsinki, Sweden',
    '0501234567',
    'No',
    '–'
  );
});
