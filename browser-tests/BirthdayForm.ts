import { loginSelector } from './pages/loginSelector';

fixture('Open birth date form').page('http://locahost:3000');

test('Test invalid dates', async t => {
  await t
    .typeText(loginSelector.day, '32')
    .typeText(loginSelector.month, '01')
    .typeText(loginSelector.year, '2010')
    .expect(loginSelector.errorText.innerText)
    .eql('Error');
});
