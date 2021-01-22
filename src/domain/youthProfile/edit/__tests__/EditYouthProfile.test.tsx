import React from 'react';
import { loader } from 'graphql.macro';

import { membershipDetailsData } from '../../../../common/test/membershipDetailsData';
import {
  render,
  screen,
  waitFor,
} from '../../../../common/test/testing-library';
import EditYouthProfile from '../EditYouthProfile';

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
  return render(<EditYouthProfile />, mocks);
};

test('form has values', async () => {
  expect.assertions(2);
  getWrapper();

  await waitFor(() => screen.getByText('Täytä tietosi'));

  expect(screen.getByDisplayValue('Teemu')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Ville')).toBeInTheDocument();

  return;
});

test('editing flag is true', async () => {
  expect.assertions(2);
  getWrapper();

  await waitFor(() => screen.getByText('Täytä tietosi'));

  expect(screen.queryByLabelText(/Ole hyvä/)).toEqual(null);
  expect(screen.getByRole('button', { name: 'Peruuta' })).toBeInTheDocument();
});
