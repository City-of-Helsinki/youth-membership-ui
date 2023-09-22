import { format, subYears } from 'date-fns';

import { loginSelector } from '../pages/loginSelector';
import { username, password, usernameWithExistingProfile } from './settings';

type UserAge = 'minor' | 'adult';
const MINOR_YEAR = format(subYears(new Date(), 15), 'yyyy');
const ADULT_YEAR = format(subYears(new Date(), 20), 'yyyy');

const givePermission = async (t: TestController) => {
  // If the user is show a permission request page
  if (await loginSelector.permissionPage.exists) {
    // Give permission
    await t.click(loginSelector.givePermissionButton);
  }
};

export const login = async (t: TestController, userAge: UserAge) => {
  await t
    .typeText(loginSelector.day, '01')
    .typeText(loginSelector.month, '01')
    .typeText(loginSelector.year, userAge === 'minor' ? MINOR_YEAR : ADULT_YEAR)
    .click(loginSelector.submitButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, username())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin);

  await givePermission(t);
};

export const loginStraight = async (t: TestController) => {
  await t
    .click(loginSelector.straightLogin)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, usernameWithExistingProfile())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin);

  await givePermission(t);
};

// login as child when already logged in 
export const loginChild = async ( t: TestController ) => {
  await t
    .typeText(loginSelector.day, '01')
    .typeText(loginSelector.month, '01')
    .typeText(loginSelector.year, MINOR_YEAR)
    .click(loginSelector.submitButton);
}
