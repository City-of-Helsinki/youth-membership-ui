import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { loader } from 'graphql.macro';
import { MemoryRouter } from 'react-router-dom';

import MembershipInformation from '../MembershipInformation';
import { updateWrapper } from '../../../../../common/test/testUtils';

const MEMBERSHIP_INFORMATION = loader(
  '../../../graphql/MembershipInformation.graphql'
);

const mocks = [
  {
    request: {
      query: MEMBERSHIP_INFORMATION,
      variables: {},
    },
    result: {
      data: {
        youthProfile: {
          profile: {
            firstName: 'Teemu',
            lastName: 'Testaaja',
          },
          expiration: '2020-02-02',
          renewable: false,
          membershipNumber: '01234',
        },
      },
    },
  },
];

it('mocked data is found', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MembershipInformation />
      </MockedProvider>
    </MemoryRouter>
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
  mocks[0].result.data.youthProfile.renewable = true;

  const wrapper = mount(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MembershipInformation />
      </MockedProvider>
    </MemoryRouter>
  );

  await updateWrapper(wrapper);

  expect(wrapper.find('button[className="button renew"]')).toHaveLength(1);
});
