import React from 'react';
import { loader } from 'graphql.macro';

import {
  render,
  screen,
  waitFor,
} from '../../../../common/test/testing-library';
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
          id: '987',
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

it.skip('mocked data is found', async () => {
  render(<MembershipInformationPage />, mocks);

  await waitFor(() =>
    expect(screen.getByText('Teemu Testaaja')).toBeInTheDocument()
  );

  expect(screen.getByText('Jäsenkortin numero 01234')).toBeInTheDocument();
  expect(screen.getByText('Voimassa 02.02.2020 asti')).toBeInTheDocument();
});

it.skip('renew button is shown', async () => {
  mocks[0].result.data.myYouthProfile.renewable = true;

  render(<MembershipInformationPage />, mocks);

  await waitFor(() =>
    expect(screen.getByText('Teemu Testaaja')).toBeInTheDocument()
  );

  expect(
    screen.getByRole('button', { name: 'Uusi jäsenyys' })
  ).toBeInTheDocument();
});
