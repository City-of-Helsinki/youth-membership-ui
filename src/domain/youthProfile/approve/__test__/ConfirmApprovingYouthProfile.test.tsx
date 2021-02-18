import React from 'react';
import { render } from '@testing-library/react';

import ConfirmApprovingYouthProfile from '../ConfirmApprovingYouthProfile';

test('matches snapshot', () => {
  const wrapper = render(<ConfirmApprovingYouthProfile />);
  expect(wrapper.container).toMatchSnapshot();
});
