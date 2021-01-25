import React from 'react';
import { loader } from 'graphql.macro';

import {
  render,
  waitFor,
  screen,
} from '../../../../common/test/testing-library';
import ViewYouthProfile from '../SentYouthProfile';

const APPROVER_EMAIL = loader('../../graphql/ApproverEmail.graphql');

const mocks = [
  {
    request: {
      query: APPROVER_EMAIL,
      variables: {},
    },
    result: {
      data: {
        myYouthProfile: {
          approverEmail: 'ville.vanhempi@test.fi',
          __typename: 'YouthProfileType',
        },
      },
      loading: false,
    },
  },
];

const getWrapper = () => {
  return render(<ViewYouthProfile />, mocks);
};

test('match snapshot', async () => {
  const wrapper = render(<ViewYouthProfile />, mocks);
  expect(wrapper.container).toMatchSnapshot();
});

test('renders view with approver email', async () => {
  getWrapper();

  await waitFor(() =>
    screen.getByText(
      'Olet lähettänyt jäsenyyden hyväksyttäväksi osoitteeseen ville.vanhempi@test.fi.'
    )
  );
});
