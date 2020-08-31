import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfirmApprovingYouthProfile from '../ConfirmApprovingYouthProfile';

test('matches snapshot', () => {
  const wrapper = shallow(<ConfirmApprovingYouthProfile />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
