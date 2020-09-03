import { login } from './pages/login';

const hasLength = (element: Element) => {
  if (!element.textContent) {
    return false;
  }

  const text = element.textContent.trim();
  return text.length > 0;
};

fixture('Navigate and view').page('http://localhost:3000');
test('Navigate and test birth date form', async t => {
  // After page load click submit button and see error about birth date
  await t
    .click(login.submitButton)
    .expect(login.errorText.exists)
    .ok();

  // User age is < 8
  await t
    .typeText(login.day, '15')
    .typeText(login.month, '03')
    .typeText(login.year, '2019')
    .expect(login.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // User age is > 29
  // Note: Use selectText in between, this results previous values to be overwritten
  await t
    .selectText(login.day)
    .typeText(login.day, '15')
    .selectText(login.month)
    .typeText(login.month, '03')
    .selectText(login.year)
    .typeText(login.year, '1990')
    .expect(login.errorText.innerText)
    .eql('Jässäri is only for youths between 8-29 years.');

  // Fill valid information and press submit
  // User age is < 13
  await t
    .selectText(login.day)
    .typeText(login.day, '15')
    .selectText(login.month)
    .typeText(login.month, '03')
    .selectText(login.year)
    .typeText(login.year, '2010')
    .click(login.submitButton)
    .expect(login.paperForm.filter(hasLength).exists);
});
