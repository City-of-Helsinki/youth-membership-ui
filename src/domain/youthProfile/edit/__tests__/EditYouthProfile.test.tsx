import React from 'react';
import { MemoryRouter } from 'react-router';
import { loader } from 'graphql.macro';

import EditYouthProfile from '../EditYouthProfile';
import { membershipDetailsData } from '../../../../common/test/membershipDetailsData';
import {
  mountWithApolloAndReduxProviders,
  updateWrapper,
} from '../../../../common/test/testUtils';

const MEMBERSHIP_DETAILS = loader(
  '../../../membership/graphql/MembershipDetails.graphql'
);

const mocks = [
  {
    request: {
      query: MEMBERSHIP_DETAILS,
      variables: {},
    },
    result: {
      loading: false,
      data: membershipDetailsData,
    },
  },
];

const getWrapper = () => {
  return mountWithApolloAndReduxProviders(
    <MemoryRouter>
      <EditYouthProfile />
    </MemoryRouter>,
    mocks
  );
};

test('form has values', async () => {
  const wrapper = getWrapper();
  await updateWrapper(wrapper);

  const firstName = wrapper.find('input[name="firstName"]');
  const approverFirstName = wrapper.find('input[name="approverFirstName"]');

  expect(firstName.props().value).toEqual('Teemu');
  expect(approverFirstName.props().value).toEqual('Ville');
});

test('editing flag is true', async () => {
  const wrapper = getWrapper();
  await updateWrapper(wrapper);

  const terms = wrapper.find('input[name="terms"]');
  const cancelButton = wrapper.find('a[href="/membership-details"]');

  expect(terms.length).toEqual(0);
  expect(cancelButton.length).toEqual(1);
});
