import { format, subYears } from 'date-fns';

import { loginSelector } from './pages/loginSelector';
import { hasLength } from './utils/valueUtils';
import { testURL } from './utils/settings';

fixture('Open login page').page(testURL());

const fillForm = async (
  t: TestController,
  day: string,
  month: string,
  year: string
) => {
  await t
    .selectText(loginSelector.day)
    .typeText(loginSelector.day, day)
    .selectText(loginSelector.month)
    .typeText(loginSelector.month, month)
    .selectText(loginSelector.year)
    .typeText(loginSelector.year, year);

  return t;
};

const AGE_IS_UNDER_REGISTRATION_MIN = format(subYears(new Date(), 7), 'yyyy');
const AGE_IS_UNDER_MIN = format(subYears(new Date(), 12), 'yyyy');
const AGE_US_OVER_MAX = format(subYears(new Date(), 30), 'yyyy');

test('Test age restrictions', async t => {
  // After page load click submit button and see error about birth date
  await t
    .click(loginSelector.submitButton)
    .expect(loginSelector.errorText.exists)
    .ok();

  // User age is < 8
  await (await fillForm(t, '01', '01', AGE_IS_UNDER_REGISTRATION_MIN))
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // User age is > 29
  // Note: Use selectText in between, this results previous values to be overwritten
  await (await fillForm(t, '01', '01', AGE_US_OVER_MAX))
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // Fill valid information and press submit
  // User age is < 13
  await (await fillForm(t, '15', '03', AGE_IS_UNDER_MIN))
    .click(loginSelector.submitButton)
    .expect(loginSelector.paperForm.filter(hasLength).exists)
    .ok();
});
