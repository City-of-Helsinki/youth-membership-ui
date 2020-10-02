import { loginSelector } from '../pages/loginSelector';
import { username, password } from './settings';
import { format, subYears } from 'date-fns';

type UserAge = 'minor' | 'adult';
const MINOR_YEAR = format(subYears(new Date(), 15), 'yyyy');
const ADULT_YEAR = format(subYears(new Date(), 20), 'yyyy');

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
};
