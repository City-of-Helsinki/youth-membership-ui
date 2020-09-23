import { loginSelector } from '../pages/loginSelector';
import { username, password } from './settings';

type UserAge = 'minor' | 'adult';

export const login = async (t: TestController, userAge: UserAge) => {
  await t
    .typeText(loginSelector.day, '01')
    .typeText(loginSelector.month, '01')
    .typeText(loginSelector.year, userAge === 'minor' ? '2005' : '2000')
    .click(loginSelector.submitButton)
    .click(loginSelector.helLoginLink)
    .typeText(loginSelector.helUsername, username())
    .typeText(loginSelector.helPassword, password())
    .click(loginSelector.helLogin);
};
