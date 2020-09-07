import { loginSelector } from './pages/loginSelector';
import { testURL } from './utils/settings';

fixture('Open birth date form').page(testURL());

test('Test invalid dates', async t => {
  await t
    .typeText(loginSelector.day, '32')
    .typeText(loginSelector.month, '01')
    .typeText(loginSelector.year, '2010')
    .click(loginSelector.submitButton)
    .expect(loginSelector.errorText.innerText)
    .eql('Invalid date');

  await t
    .selectText(loginSelector.day)
    .typeText(loginSelector.day, '30')
    .selectText(loginSelector.month)
    .typeText(loginSelector.month, '02')
    .selectText(loginSelector.year)
    .typeText(loginSelector.year, '2010')
    .expect(loginSelector.errorText.innerText)
    .eql('Invalid date');

  await t
    .selectText(loginSelector.day)
    .typeText(loginSelector.day, '01')
    .selectText(loginSelector.month)
    .typeText(loginSelector.month, '13')
    .selectText(loginSelector.year)
    .typeText(loginSelector.year, '2010')
    .expect(loginSelector.errorText.innerText)
    .eql('Invalid date');
});
