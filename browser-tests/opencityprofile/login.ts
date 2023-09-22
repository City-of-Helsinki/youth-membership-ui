import { screen } from '@testing-library/testcafe';
import { Selector } from 'testcafe';
import { openCityProfileUsername, openCityProfilePassword } from '../utils/settings';

export const loginPage = {
  loginButton: Selector('input[type="submit"]'),
  username: Selector('#id_username'),
  password: Selector('#id_password'),
};

export const login = async (t: TestController) => {
  const username = openCityProfileUsername(), password = openCityProfilePassword();

  await t
    .typeText(loginPage.username, username)
    .typeText(loginPage.password, password)
    .click(loginPage.loginButton);
};

