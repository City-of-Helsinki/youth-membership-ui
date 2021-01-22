import React from 'react';
import { subYears, format } from 'date-fns';

import { render, screen } from '../../../../common/test/testing-library';
import {
  AddressType,
  Language,
  YouthLanguage,
  MembershipDetails_myYouthProfile_profile_primaryAddress as PrimaryAddress,
} from '../../../../graphql/generatedTypes';
import YouthProfileForm, { Values as FormValues } from '../YouthProfileForm';

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
  return render(
    <YouthProfileForm
      profile={profile}
      onValues={jest.fn()}
      isSubmitting={false}
      isEditing={!!isEditing}
    />
  );
};

test('Form is used for profile creation with pre-filled data ', async () => {
  getWrapper(getPrefilledProfile());

  expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Person')).toBeInTheDocument();
  expect(screen.getByLabelText(/Olen tutustunut/).checked).toEqual(false);
  expect(
    screen.getByRole('button', { name: /Tallenna tiedot/ })
  ).toBeInTheDocument();
});

test('Profile is used for profile editing', async () => {
  getWrapper(getPrefilledProfile(), true);

  expect(
    screen.getByRole('button', { name: 'Tallenna tiedot' })
  ).toBeInTheDocument();
  expect(screen.queryByLabelText('Terms')).toEqual(null);
});

describe('Form fields & texts based on user age', () => {
  test('user age is >= 13 < 15', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 14), 'yyyy-MM-dd');
    getWrapper(getPrefilledProfile({ birthDate: userAge }));

    // Photo permission is not shown
    expect(
      screen
        .getByText('Kuvauslupa')
        .parentElement?.classList.contains('hidePhotoUsageApproved')
    ).toEqual(true);
    expect(
      screen.getByText(
        'Vahvistuspyyntö jäsenyydestäsi lähetetään tähän osoitteeseen, huoltaja varmistaa tiedot ja hyväksyy jäsenyyden.'
      )
    ).toBeInTheDocument();
  });
  test('user age is >= 15 < 18', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 16), 'yyyy-MM-dd');
    getWrapper(getPrefilledProfile({ birthDate: userAge }));

    // Photo permission is shown
    expect(
      screen
        .getByText('Kuvauslupa')
        .parentElement?.classList.contains('hidePhotoUsageApproved')
    ).toEqual(false);
    expect(
      screen.getByText(
        'Vahvistuspyyntö jäsenyydestäsi lähetetään tähän osoitteeseen, huoltaja varmistaa tiedot ja hyväksyy jäsenyyden.'
      )
    ).toBeInTheDocument();
  });
  test('user is over 18', () => {
    // Create birthDate that fits test criteria
    const userAge = format(subYears(new Date(), 19), 'yyyy-MM-dd');
    getWrapper(getPrefilledProfile({ birthDate: userAge }));

    // Show guardian info text for adults
    expect(
      screen.getByText(
        'Yli 18-vuotiaalta emme edellytä vanhemman yhteystietojen lisäämistä. Mutta mikäli syystä tai toisesta koet tarpeelliseksi, että voimme tarvittaessa olla yhteydessä huoltajaasi, voit lisätä yhteystiedon tähän.'
      )
    ).toBeInTheDocument();
  });
});

describe('postalCode inputMode changes based on selected country', () => {
  test('inputMode is numeric when countryCode === "FI" ', () => {
    getWrapper(getPrefilledProfile());

    expect(screen.getByLabelText('Postinumero *').inputMode).toEqual('numeric');
  });

  test('inputMode is text when countryCode !== "FI', () => {
    getWrapper(
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

    expect(screen.getByLabelText('Postinumero *').inputMode).toEqual('text');
  });
});
