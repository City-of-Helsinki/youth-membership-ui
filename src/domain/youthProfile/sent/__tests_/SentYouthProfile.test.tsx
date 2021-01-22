import React from 'react';
import { MemoryRouter } from 'react-router';
import { loader } from 'graphql.macro';

import ViewYouthProfile from '../SentYouthProfile';
import {
  mountWithProviders,
  updateWrapper,
} from '../../../../common/test/testUtils';
import { render } from '../../../../common/test/testing-library';

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
  return mountWithProviders(
    <MemoryRouter>
      <ViewYouthProfile />
    </MemoryRouter>,
    mocks
  );
};

test('match snapshot', async () => {
  const wrapper = render(<ViewYouthProfile />, mocks);
  expect(wrapper.container).toMatchSnapshot();
});

test('renders view with approver email', async () => {
  const wrapper = getWrapper();
  await updateWrapper(wrapper);

  const helpText = wrapper.find('.helpText').text();
  expect(helpText).toEqual(
    'Olet lähettänyt jäsenyyden hyväksyttäväksi osoitteeseen ville.vanhempi@test.fi.'
  );
});
