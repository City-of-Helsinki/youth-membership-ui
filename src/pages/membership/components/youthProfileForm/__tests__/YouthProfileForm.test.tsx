import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';

import YouthProfileForm, { FormValues } from '../YouthProfileForm';
import { Language, YouthLanguage } from '../../../../../graphql/generatedTypes';
import { updateWrapper } from '../../../../../common/test/testUtils';

const emptyProfile: FormValues = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  profileLanguage: Language.FINNISH,
  languageAtHome: YouthLanguage.FINNISH,
  schoolName: '',
  schoolClass: '',
  photoUsageApproved: '',
  approverEmail: '',
  approverLastName: '',
  approverFirstName: '',
  approverPhone: '',
};

const prefilledProfile: FormValues = {
  firstName: 'Test',
  lastName: 'Person',
  birthDate: '2000-1-1',
  email: 'test@test.fi',
  phone: '0501234567',
  address: 'TestAddress',
  city: 'Helsinki',
  postalCode: '12345',
  profileLanguage: Language.FINNISH,
  languageAtHome: YouthLanguage.FINNISH,
  schoolName: 'School',
  schoolClass: '',
  photoUsageApproved: 'false',
  approverEmail: 'test@test.fi',
  approverLastName: 'TestApprover',
  approverFirstName: 'TestFirstName',
  approverPhone: '0501234567',
};

const getWrapper = (profile: FormValues, isEditing?: boolean) => {
  return mount(
    <MemoryRouter>
      <YouthProfileForm
        profile={profile}
        onValues={jest.fn()}
        isSubmitting={false}
        isEditing={!!isEditing}
      />
    </MemoryRouter>
  );
};

test('Form is used for profile creation with pre-filled data ', async () => {
  const wrapper = getWrapper(prefilledProfile);
  await updateWrapper(wrapper);

  const firstName = wrapper.find('input[id="firstName"]');
  const lastName = wrapper.find('input[id="lastName"]');
  const terms = wrapper.find('input[type="checkbox"]');
  const submitButton = wrapper.find('button[type="submit"]');

  expect(firstName.props().value).toEqual('Test');
  expect(lastName.props().value).toEqual('Person');
  expect(terms).toBeTruthy();
  expect(submitButton.text()).toEqual(
    'Tallenna tiedot ja lähetä varmistuspyyntö'
  );
});

test('Profile is used for profile editing', async () => {
  const wrapper = getWrapper(prefilledProfile, true);

  await updateWrapper(wrapper);

  const submitButton = wrapper.find('button[type="submit"]');
  const buttonRow = wrapper.find('.buttonAlign');
  const terms = wrapper.find('input[type="checkbox"]');

  expect(submitButton.text()).toEqual('Tallenna tiedot');
  expect(buttonRow.children().length).toEqual(2);
  expect(terms.length).toEqual(0);
});
