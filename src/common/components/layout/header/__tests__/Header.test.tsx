import React from 'react';

import { render } from '../../../../test/testing-library';
import Header from '../Header';

test('matches snapshot', () => {
  const wrapper = render(<Header />);

  expect(wrapper.container).toMatchSnapshot();
});
