import React from 'react';

import { render } from '../../../test/testing-library';
import PageLayout from '../PageLayout';

test('matches snapshot', () => {
  const wrapper = render(
    <PageLayout background="youth">
      <div />
    </PageLayout>
  );

  expect(wrapper.container).toMatchSnapshot();
});
