// @ts-ignore
require('dotenv').config({ path: '.env' });

const LOCAL_URL = 'http://localhost:3000';

export const username = (): string => {
  if (!process.env.BROWSER_TESTING_USERNAME) {
    throw new Error('No BROWSER_TESTING_USERNAME specified');
  }
  return process.env.BROWSER_TESTING_USERNAME;
};

export const usernameWithExistingProfile = (): string => {
  if (!process.env.BROWSER_TESTING_USERNAME_WITH_PROFILE) {
    throw new Error('No BROWSER_TESTING_USERNAME specified');
  }
  return process.env.BROWSER_TESTING_USERNAME_WITH_PROFILE;
};

export const password = (): string => {
  if (!process.env.BROWSER_TESTING_PASSWORD) {
    throw new Error('No BROWSER_TESTING_PASSWORD specified');
  }

  return process.env.BROWSER_TESTING_PASSWORD;
};

export const testURL = () => {
  const baseUrl = process.env.BROWSER_TESTING_URL || LOCAL_URL;

  return `${baseUrl}/en/`;
};

export const mailosaurApiKey = (): string => {
  if (!process.env.BROWSER_TESTING_MAILOSAUR_API) {
    throw new Error('No BROWSER_TESTING_MAILOSAUR_API specified');
  }

  return process.env.BROWSER_TESTING_MAILOSAUR_API;
};
export const mailosaurServerId = (): string => {
  if (!process.env.BROWSER_TESTING_MAILOSAUR_SERVER_ID) {
    throw new Error('No BROWSER_TESTING_MAILOSAUR_SERVER_ID specified');
  }

  return process.env.BROWSER_TESTING_MAILOSAUR_SERVER_ID;
};

// open-city-profile
// are needed to add client id to profile
export const openCityProfileURL = (): string => {
  const baseUrl = process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_URL ?? '';

  return `${baseUrl}`;
};
export const openCityProfileUsername = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME specified');
  }
  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_USERNAME;
};
export const openCityProfilePassword = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD specified');
  }

  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_PASSWORD;
};
export const openCityProfileClientId = (): string => {
  if (!process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID) {
    throw new Error('No BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID specified');
  }

  return process.env.BROWSER_TESTING_OPEN_CITY_PROFILE_CLIENTID;
};
