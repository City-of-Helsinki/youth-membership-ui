import yupErrorReconciler from '../yupErrorReconciler';

describe('yupErrorReconciler', () => {
  it('works with strings', () => {
    const stringError = 'string-error';

    expect(yupErrorReconciler(stringError)).toEqual([stringError]);
  });

  it('works with objects', () => {
    const objectError = {
      key: 'object-error-key',
      values: {
        label: 'fields.label',
      },
    };

    expect(yupErrorReconciler(objectError)).toEqual([
      objectError.key,
      objectError.values,
    ]);
  });
});
