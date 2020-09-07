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

test('Test age restrictions', async t => {
  // After page load click submit button and see error about birth date
  await t
    .click(loginSelector.submitButton)
    .expect(loginSelector.errorText.exists)
    .ok();

  // User age is < 8
  await (await fillForm(t, '01', '01', '2020'))
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // User age is > 29
  // Note: Use selectText in between, this results previous values to be overwritten
  await (await fillForm(t, '15', '03', '1990'))
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // Fill valid information and press submit
  // User age is < 13
  await (await fillForm(t, '15', '03', '2010'))
    .click(loginSelector.submitButton)
    .expect(loginSelector.paperForm.filter(hasLength).exists)
    .ok();
});
