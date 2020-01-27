import isMembershipValid from '../isMembershipValid';

it('current date is after expiration date', () => {
  const testData = isMembershipValid('2020-01-01', '2020-01-01');
  expect(testData).toEqual(false);
});

it('approved time is null', () => {
  const testData = isMembershipValid('2020-01-01', null);
  expect(testData).toEqual(false);
});

it('approved time is after current date', () => {
  const testData = isMembershipValid('2020-01-01', '2030-01-01');
  expect(testData).toEqual(false);
});

it('dates are valid', () => {
  const testData = isMembershipValid('2030-01-01', '2020-01-01');
  expect(testData).toEqual(true);
});
