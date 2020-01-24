import convertDateToLocale from '../convertDateToLocale';

it('test function with undefined', () => {
  const testValue = convertDateToLocale(undefined);
  expect(testValue).toEqual('');
});

it('test function with null', () => {
  const testValue = convertDateToLocale(null);
  expect(testValue).toEqual('');
});

it('test function with correct date', () => {
  const testValue = convertDateToLocale('2019-01-01');
  expect(testValue).toEqual('01.01.2019');
});
