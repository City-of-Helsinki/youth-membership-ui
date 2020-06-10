import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AccessibilityStatementFi from '../AccessibilityStatementFi';

test('matches snapshot', () => {
  const wrapper = shallow(<AccessibilityStatementFi />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
