import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import YouthProfile from '../YouthProfile';

it('it matches snapshot', () => {
  const wrapper = shallow(
    <MockedProvider>
      <YouthProfile />
    </MockedProvider>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
