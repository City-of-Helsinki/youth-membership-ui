import { GlobalWithFetchMock } from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import './common/test/testi18nInit';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
// eslint-disable-next-line @typescript-eslint/no-require-imports
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.scrollTo = jest.fn();
