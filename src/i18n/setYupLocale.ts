import * as yup from 'yup';

function setYupLocale(localYup = yup) {
  localYup.setLocale({
    mixed: {
      required: (options: Partial<yup.TestMessageParams>) => ({
        key: 'validation.required',
        values: options,
      }),
    },
    string: {
      min: (options: Partial<yup.TestMessageParams>) => ({
        key: 'validation.tooShort',
        values: options,
      }),
      max: (options: Partial<yup.TestMessageParams>) => ({
        key: 'validation.tooLong',
        values: options,
      }),
      email: () => ({
        key: 'validation.email',
      }),
    },
  });
}

export default setYupLocale;
