import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { subYears, format } from 'date-fns';

import YouthProfileForm, { Values as FormValues } from '../YouthProfileForm';
import {
  AddressType,
  Language,
  YouthLanguage,
  MembershipDetails_youthProfile_profile_primaryAddress as PrimaryAddress,
} from '../../../../graphql/generatedTypes';
import { updateWrapper } from '../../../../common/test/testUtils';

const getPrefilledProfile = (values?: Partial<FormValues>) => {
  return {
    firstName: 'Test',
    lastName: 'Person',
    primaryAddress: {
      address: 'TestAddress',
      countryCode: 'FI',
      city: 'Helsinki',
      postalCode: '12345',
      id: '123',
      primary: true,
      addressType: AddressType.OTHER,
      __typename: 'AddressNode',
    } as PrimaryAddress,
    addresses: [],
    birthDate: '2000-1-1',
    email: 'test@test.fi',
    phone: '0501234567',
    profileLanguage: Language.FINNISH,
    languageAtHome: YouthLanguage.FINNISH,
    schoolName: 'School',
    schoolClass: '',
    photoUsageApproved: 'false',
    approverEmail: 'test@test.fi',
    approverLastName: 'TestApprover',
    approverFirstName: 'TestFirstName',
    approverPhone: '0501234567',
    additionalContactPersons: [],
    ...values,
  };
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
  const wrapper = getWrapper(getPrefilledProfile());
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
  const wrapper = getWrapper(getPrefilledProfile(), true);

  await updateWrapper(wrapper);

  const submitButton = wrapper.find('button[type="submit"]');
  const buttonRow = wrapper.find('.buttonAlign');
  const terms = wrapper.find('input[type="checkbox"]');

  expect(submitButton.text()).toEqual('Tallenna tiedot');
  expect(buttonRow.children().length).toEqual(2);
  expect(terms.length).toEqual(0);
});

describe('Form fields & texts based on user age', () => {
  test('user age is >= 13 < 15', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 14), 'yyyy-MM-dd');
    const wrapper = getWrapper(getPrefilledProfile({ birthDate: userAge }));
    const photoPermission = wrapper.find('.hidePhotoUsageApproved');
    const approverInfoText = wrapper.find('p[data-testid="approverInfoText"]');

    // Photo permission is not shown
    expect(photoPermission.length).toEqual(1);
    expect(approverInfoText.text()).toEqual(
      'Vahvistuspyyntö jäsenyydestäsi lähetetään tähän osoitteeseen, huoltaja varmistaa tiedot ja hyväksyy jäsenyyden.'
    );
  });
  test('user age is >= 15 < 18', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 16), 'yyyy-MM-dd');
    const wrapper = getWrapper(getPrefilledProfile({ birthDate: userAge }));
    const photoPermission = wrapper.find('.hidePhotoUsageApproved');
    const approverInfoText = wrapper.find('p[data-testid="approverInfoText"]');

    // Photo permission is shown
    expect(photoPermission.length).toEqual(0);
    expect(approverInfoText.text()).toEqual(
      'Vahvistuspyyntö jäsenyydestäsi lähetetään tähän osoitteeseen, huoltaja varmistaa tiedot ja hyväksyy jäsenyyden.'
    );
  });
  test('user is over 18', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 19), 'yyyy-MM-dd');
    const wrapper = getWrapper(getPrefilledProfile({ birthDate: userAge }));
    const approverInfoText = wrapper.find('p[data-testid="approverInfoText"]');

    // Show guardian info text for adults
    expect(approverInfoText.text()).toEqual(
      //eslint-disable-next-line max-len
      'Yli 18-vuotiaalta emme edellytä vanhemman yhteystietojen lisäämistä. Mutta mikäli syystä tai toisesta koet tarpeelliseksi, että voimme tarvittaessa olla yhteydessä huoltajaasi, voit lisätä yhteystiedon tähän. '
    );
  });
});

describe('postalCode inputMode changes based on selected country', () => {
  test('inputMode is numeric when countryCode === "FI" ', () => {
    const wrapper = getWrapper(getPrefilledProfile());
    const postalCode = wrapper.find('input[name="primaryAddress.postalCode"]');
    expect(postalCode.props().inputMode).toEqual('numeric');
  });

  test('inputMode is text when countryCode !== "FI', () => {
    const wrapper = getWrapper(
      getPrefilledProfile({
        primaryAddress: {
          address: 'TestAddress',
          countryCode: 'SV',
          city: 'Helsinki',
          postalCode: '12345',
          id: '123',
          primary: true,
          addressType: AddressType.OTHER,
          __typename: 'AddressNode',
        },
      })
    );
    const postalCode = wrapper.find('input[name="primaryAddress.postalCode"]');
    expect(postalCode.props().inputMode).toEqual('text');
  });
});
