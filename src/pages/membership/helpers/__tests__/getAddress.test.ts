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

  const testData = getAddress(data);
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

  const testData = getAddress(data);
  expect(testData).toEqual(',  ');
});

it('test function with all values', () => {
  const data = {
    youthProfileByApprovalToken: {
      profile: {
        primaryAddress: {
          address: 'TestAddress',
          postalCode: '12345',
          city: 'Helsinki',
        },
      },
    },
  } as YouthProfileByApprovalToken;

  const testData = getAddress(data);
  expect(testData).toEqual('TestAddress, 12345 Helsinki');
});

it('can get address from MembershipDetails', () => {
  const data = {
    youthProfile: {
      profile: {
        primaryAddress: {
          address: 'Teststreet Ö 44',
          postalCode: '00990',
          city: 'Helsingfors',
        },
      },
    },
  } as MembershipDetails;
  const value = getAddress(data);
  expect(value).toBe('Teststreet Ö 44, 00990 Helsingfors');
});
