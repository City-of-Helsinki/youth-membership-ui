import { Selector } from 'testcafe';
export const loginSelector = {
  submitButton: Selector('button[type="submit"]'),
  straightLogin: Selector('button').withText('Log in'),
  errorText: Selector('span[class="hds-text-input__error-text"]'),
  day: Selector('input[id="ym-date-input-date-id"]'),
  month: Selector('input[id="ym-date-input-month-id"]'),
  year: Selector('input[id="ym-date-input-year-id"]'),
  paperForm: Selector('button[test-id="goBack"]'),
  helLoginLink: Selector('.login-method-helusername'),
  helUsername: Selector('#username'),
  helPassword: Selector('#password'),
  helLogin: Selector('#kc-login'),
};
