import React from 'react';

import { render } from '../../../../test/testing-library';
import Footer from '../Footer';

test('matches snapshot', () => {
  const wrapper = render(<Footer />);

  expect(wrapper.container).toMatchSnapshot();
});
