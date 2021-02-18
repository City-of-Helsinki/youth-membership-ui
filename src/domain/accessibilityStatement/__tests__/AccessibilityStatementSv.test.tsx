import React from 'react';
import { render } from '@testing-library/react';

import AccessibilityStatementSv from '../AccessibilityStatementSv';

test('matches snapshot', () => {
  const wrapper = render(<AccessibilityStatementSv />);
  expect(wrapper.container).toMatchSnapshot();
});
