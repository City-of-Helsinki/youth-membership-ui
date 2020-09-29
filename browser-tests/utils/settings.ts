// @ts-ignore
require('dotenv').config({ path: '.env' });

const LOCAL_URL = 'http://localhost:3000';
const TEST_URL = 'https://jassari.test.kuva.hel.ninja';

export const username = (): string => {
  if (!process.env.REACT_APP_TESTING_USERNAME) {
    throw new Error('No REACT_APP_TESTING_USERNAME specified');
  }
  return process.env.REACT_APP_TESTING_USERNAME;
};

export const password = (): string => {
  if (!process.env.REACT_APP_TESTING_PASSWORD) {
    throw new Error('No REACT_APP_TESTING_PASSWORD specified');
  }
  return process.env.REACT_APP_TESTING_PASSWORD;
};

export const testURL = () => {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
      return LOCAL_URL;
    case 'staging':
      return TEST_URL;
    case 'testing':
      return TEST_URL;
    default:
      return TEST_URL;
  }
};
