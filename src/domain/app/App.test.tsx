import React from 'react';

import { render } from '../../common/test/testing-library';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
});
