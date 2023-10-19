import { screen } from '@testing-library/testcafe';
import { Selector } from 'testcafe';

export const loginSelector = {
  header: Selector('h1').withText(
    /The service is not available|Palvelu ei ole enää käytössä/i
  ),
  submitButton: Selector('button[type="submit"]'),
  straightLogin: Selector('button').withText('Log in'),
  errorText: Selector('span[class="hds-text-input__error-text"]'),
  day: Selector('input[id="ym-date-input-date-id"]'),
  month: Selector('input[id="ym-date-input-month-id"]'),
  year: Selector('input[id="ym-date-input-year-id"]'),
  paperForm: Selector('button[test-id="goBack"]'),
  helLoginLink: Selector('.btn-helusername'),
  helUsername: Selector('#username'),
  helPassword: Selector('#password'),
  helLogin: Selector('#kc-login'),
  permissionPage: Selector('h2').withText(/Permission request|Lupapyyntö/i),
  givePermissionButton: Selector('input[type="submit"][value="Anna lupa"]'),
};
