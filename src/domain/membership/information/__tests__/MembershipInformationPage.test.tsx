import React from 'react';
import { loader } from 'graphql.macro';
import { MemoryRouter } from 'react-router-dom';

import {
  mountWithProviders,
  updateWrapper,
} from '../../../../common/test/testUtils';
import MembershipInformationPage from '../MembershipInformationPage';

const MEMBERSHIP_INFORMATION = loader(
  '../../graphql/MembershipInformation.graphql'
);

const mocks = [
  {
    request: {
      query: MEMBERSHIP_INFORMATION,
      variables: {},
    },
    result: {
      data: {
        myYouthProfile: {
          profile: {
            id: '123',
            firstName: 'Teemu',
            lastName: 'Testaaja',
            __typename: 'ProfileNode',
          },
          expiration: '2020-02-02',
          renewable: false,
          membershipNumber: '01234',
          __typename: 'YouthProfileNode',
        },
      },
    },
  },
];

it('mocked data is found', async () => {
  const wrapper = mountWithProviders(
    <MemoryRouter>
      <MembershipInformationPage />
    </MemoryRouter>,
    mocks
  );

  await updateWrapper(wrapper);

  const name = wrapper.find('h1').text();
  const membershipNumber = wrapper.find('h3').text();
  const validUntil = wrapper.find('.validUntil').text();

  expect(name).toEqual('Teemu Testaaja');
  expect(membershipNumber).toEqual('Jäsenkortin numero 01234');
  expect(validUntil).toEqual('Voimassa 02.02.2020 asti');
});

it('renew button is shown', async () => {
  mocks[0].result.data.myYouthProfile.renewable = true;

  const wrapper = mountWithProviders(
    <MemoryRouter>
      <MembershipInformationPage />
    </MemoryRouter>,
    mocks
  );

  await updateWrapper(wrapper);

  expect(wrapper.find('button[data-cy="renew"]')).toHaveLength(1);
});
