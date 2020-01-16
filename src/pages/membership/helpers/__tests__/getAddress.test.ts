import getAddress from '../getAddress';
import { YouthProfileByApprovalToken } from '../../../../graphql/generatedTypes';

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
  expect(testData).toEqual('TestAddress, Helsinki 12345');
});
