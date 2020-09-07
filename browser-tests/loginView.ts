import { loginSelector } from './pages/loginSelector';
import { hasLength } from './utils/valueUtils';
import { testURL } from './utils/settings';

fixture('Open login page').page(testURL());
test('Test age restrictions', async t => {
  // After page load click submit button and see error about birth date
  await t
    .click(loginSelector.submitButton)
    .expect(loginSelector.errorText.exists)
    .ok();

  // User age is < 8
  await t
    .typeText(loginSelector.day, '15')
    .typeText(loginSelector.month, '03')
    .typeText(loginSelector.year, '2019')
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // User age is > 29
  // Note: Use selectText in between, this results previous values to be overwritten
  await t
    .selectText(loginSelector.day)
    .typeText(loginSelector.day, '15')
    .selectText(loginSelector.month)
    .typeText(loginSelector.month, '03')
    .selectText(loginSelector.year)
    .typeText(loginSelector.year, '1990')
    .expect(loginSelector.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // Fill valid information and press submit
  // User age is < 13
  await t
    .selectText(loginSelector.day)
    .typeText(loginSelector.day, '15')
    .selectText(loginSelector.month)
    .typeText(loginSelector.month, '03')
    .selectText(loginSelector.year)
    .typeText(loginSelector.year, '2010')
    .click(loginSelector.submitButton)
    .expect(loginSelector.paperForm.filter(hasLength).exists)
    .ok();
});
