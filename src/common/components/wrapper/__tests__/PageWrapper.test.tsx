import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PageWrapper from '../PageWrapper';

it('matches snapshot', () => {
  const wrapper = shallow(<PageWrapper />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
