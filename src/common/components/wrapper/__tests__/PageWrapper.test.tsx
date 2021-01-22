import React from 'react';

import { render } from '../../../test/testing-library';
import PageWrapper from '../PageWrapper';

it('matches snapshot', () => {
  const wrapper = render(<PageWrapper />);
  expect(wrapper.container).toMatchSnapshot();
});
