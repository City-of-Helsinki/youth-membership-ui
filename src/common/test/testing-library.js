// https://testing-library.com/docs/react-testing-library/setup
import { render } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';

import store from '../../redux/store';

const AllTheProviders = ({ children, mocks }) => {
  return (
    <MockedProvider mocks={mocks}>
      <ReduxProvider store={store}>
        <HelmetProvider>
          <Router>{children}</Router>
        </HelmetProvider>
      </ReduxProvider>
    </MockedProvider>
  );
};

const customRender = (ui, mocks, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders mocks={mocks}>{children}</AllTheProviders>
    ),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
