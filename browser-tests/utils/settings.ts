const LOCAL_URL = 'http://localhost:3000';
const TEST_URL = 'https://jassari.test.kuva.hel.ninja';

export const testURL = () => {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
      return LOCAL_URL;
    case 'staging':
      return TEST_URL;
    default:
      return LOCAL_URL;
  }
};
