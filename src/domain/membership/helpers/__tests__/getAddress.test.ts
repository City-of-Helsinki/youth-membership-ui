import getAddress from '../getAddress';
import {
  YouthProfileByApprovalToken,
  MembershipDetails,
} from '../../../../graphql/generatedTypes';

it('test function with empty undefined', () => {
  const data = {
    youthProfileByApprovalToken: {
      profile: {},
    },
  } as YouthProfileByApprovalToken;

  const testData = getAddress(data, 'fi');
  expect(testData).toEqual('');
});

it('test function with empty values', () => {
  const data = {
    youthProfileByApprovalToken: {
      profile: {
        primaryAddress: {
          address: '',
          postalCode: '',
          city: '',
        },
      },
    },
  } as YouthProfileByApprovalToken;

  const testData = getAddress(data, 'fi');
  expect(testData).toEqual('Suomi');
});

it('test function with all values', () => {
  const data = {
    youthProfileByApprovalToken: {
      profile: {
        primaryAddress: {
          address: 'TestAddress',
          postalCode: '12345',
          city: 'Helsinki',
          countryCode: 'FI',
        },
      },
    },
  } as YouthProfileByApprovalToken;

  const testData = getAddress(data, 'fi');
  expect(testData).toEqual('TestAddress, 12345, Helsinki, Suomi');
});

it('can get address from MembershipDetails', () => {
  const data = {
    myYouthProfile: {
      profile: {
        primaryAddress: {
          address: 'Teststreet Ö 44',
          postalCode: '00990',
          city: 'Helsingfors',
          countryCode: 'SE',
        },
      },
    },
  } as MembershipDetails;
  const value = getAddress(data, 'fi');
  expect(value).toBe('Teststreet Ö 44, 00990, Helsingfors, Ruotsi');
});

it('should return country when lang contains locale', () => {
  const data = {
    youthProfileByApprovalToken: {
      profile: {
        primaryAddress: {
          address: '',
          postalCode: '',
          city: '',
          countryCode: 'FI',
        },
      },
    },
  } as YouthProfileByApprovalToken;

  expect(getAddress(data, 'fi-FI')).toEqual('Suomi');
});
