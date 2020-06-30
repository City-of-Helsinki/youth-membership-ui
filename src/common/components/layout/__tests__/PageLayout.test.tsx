import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PageLayout from '../PageLayout';

test('matches snapshot', () => {
  const wrapper = shallow(
    <PageLayout background="youth">
      <div />
    </PageLayout>
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
