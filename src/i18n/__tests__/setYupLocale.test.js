import setYupLocale from '../setYupLocale';

describe('setYupLocale', () => {
  const setLocale = jest.fn();
  const fakeYup = {
    setLocale,
  };

  it('should mutate the yup object', () => {
    setYupLocale(fakeYup);

    expect(setLocale.mock.calls[0][0]).toEqual({
      mixed: {
        required: expect.any(Function),
      },
      string: {
        min: expect.any(Function),
        max: expect.any(Function),
        email: expect.any(Function),
      },
    });
  });

  it('should provide working translation utils', () => {
    setYupLocale(fakeYup);

    const rules = setLocale.mock.calls[0][0];

    expect(rules.mixed.required()).toMatchInlineSnapshot(`
      Object {
        "key": "validation.required",
        "values": undefined,
      }
    `);
    expect(rules.string.min({ min: 2 })).toMatchInlineSnapshot(`
      Object {
        "key": "validation.tooShort",
        "values": Object {
          "min": 2,
        },
      }
    `);
    expect(rules.string.max({ max: 3 })).toMatchInlineSnapshot(`
      Object {
        "key": "validation.tooLong",
        "values": Object {
          "max": 3,
        },
      }
    `);
    expect(rules.string.email()).toMatchInlineSnapshot(`
      Object {
        "key": "validation.email",
      }
    `);
  });
});
