import React from 'react';
import toJson from 'enzyme-to-json';

import { mountWithProvider } from '../../../../test/testUtils';
import Header from '../Header';

test.skip('matches snapshot', () => {
  const wrapper = mountWithProvider(<Header />);

  expect(toJson(wrapper)).toMatchSnapshot();
});
