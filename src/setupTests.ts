import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import './common/test/test18nInit';

// Jest canvas mock is for testing component with QR code
import 'jest-canvas-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
// eslint-disable-next-line @typescript-eslint/no-require-imports
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

configure({ adapter: new Adapter() });

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
