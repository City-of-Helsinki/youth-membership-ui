import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AccessibilityStatementEn from '../AccessibilityStatementEn';

test('matches snapshot', () => {
  const wrapper = shallow(<AccessibilityStatementEn />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
