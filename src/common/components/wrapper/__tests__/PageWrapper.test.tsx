import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from '../../../../redux/store';
import PageWrapper from '../PageWrapper';

it('matches snapshot', () => {
  const wrapper = mount(
    <Provider store={store}>
      <HelmetProvider>
        <MemoryRouter keyLength={0}>
          <PageWrapper />
        </MemoryRouter>
      </HelmetProvider>
    </Provider>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
