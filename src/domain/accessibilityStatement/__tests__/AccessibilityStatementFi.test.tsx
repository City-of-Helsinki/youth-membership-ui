import React from 'react';
import { render } from '@testing-library/react';

import AccessibilityStatementFi from '../AccessibilityStatementFi';

test('matches snapshot', () => {
  const wrapper = render(<AccessibilityStatementFi />);
  expect(wrapper.container).toMatchSnapshot();
});
