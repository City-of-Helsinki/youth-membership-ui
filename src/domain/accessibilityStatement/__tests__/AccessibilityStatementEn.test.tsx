import React from 'react';
import { render } from '@testing-library/react';

import AccessibilityStatementEn from '../AccessibilityStatementEn';

test('matches snapshot', () => {
  const wrapper = render(<AccessibilityStatementEn />);
  expect(wrapper.container).toMatchSnapshot();
});
