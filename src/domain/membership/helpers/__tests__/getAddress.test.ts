import getAddress from '../getAddress';
import {
  MembershipDetails_myYouthProfile_profile as Profile,
  MembershipDetails,
} from '../../../../graphql/generatedTypes';

it('test function with empty undefined', () => {
  const profile = {} as Profile;

  const testData = getAddress(profile, 'fi');
  expect(testData).toEqual('');
});

it('test function with empty values', () => {
  const profile = {
    primaryAddress: {
      address: '',
      postalCode: '',
      city: '',
    },
  } as Profile;

  const testData = getAddress(profile, 'fi');
  expect(testData).toEqual('Suomi');
});

it('test function with all values', () => {
  const profile = {
    primaryAddress: {
      address: 'TestAddress',
      postalCode: '12345',
      city: 'Helsinki',
      countryCode: 'FI',
    },
  } as Profile;

  const testData = getAddress(profile, 'fi');
  expect(testData).toEqual('TestAddress, 12345, Helsinki, Suomi');
});

it('should return country when lang contains locale', () => {
  const profile = {
    primaryAddress: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: 'FI',
    },
  } as Profile;

  expect(getAddress(profile, 'fi-FI')).toEqual('Suomi');
});
