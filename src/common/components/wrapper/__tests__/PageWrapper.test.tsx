import React from 'react';
import { mountWithProviders } from '../../../test/testUtils';
import { MemoryRouter } from 'react-router';
import toJson from 'enzyme-to-json';

import PageWrapper from '../PageWrapper';

it('matches snapshot', () => {
  const wrapper = mountWithProviders(
    <MemoryRouter>
      <PageWrapper />
    </MemoryRouter>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
