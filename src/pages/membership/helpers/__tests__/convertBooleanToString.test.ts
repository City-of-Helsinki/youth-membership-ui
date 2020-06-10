import convertBooleanToString from '../convertBooleanToString';

it('test function with undefined', () => {
  const testValue = convertBooleanToString(undefined);
  expect(testValue).toEqual('false');
});

it('test function with null', () => {
  const testValue = convertBooleanToString(null);
  expect(testValue).toEqual('false');
});

it('test function with boolean true', () => {
  const testValue = convertBooleanToString(true);
  expect(testValue).toEqual('true');
});

it('test function with boolean false', () => {
  const testValue = convertBooleanToString(false);
  expect(testValue).toEqual('false');
});
