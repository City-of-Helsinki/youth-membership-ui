import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AccessibilityStatementSv from '../AccessibilityStatementSv';

test('matches snapshot', () => {
  const wrapper = shallow(<AccessibilityStatementSv />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
