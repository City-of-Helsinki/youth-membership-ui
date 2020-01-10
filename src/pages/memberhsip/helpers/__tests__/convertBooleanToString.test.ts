import convertBooleanToString from '../convertBooleanToString';

it('test function with undefined', () => {
  const testValue = convertBooleanToString(undefined);
  expect(testValue).toEqual('false');
});

it('test function with null', () => {
  const testValue = convertBooleanToString(null);
  expect(testValue).toEqual('false');
});

it('test function with boolean', () => {
  const testValue = convertBooleanToString(true);
  expect(testValue).toEqual('true');
});
