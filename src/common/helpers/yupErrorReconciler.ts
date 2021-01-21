import i18n from 'i18next';
import * as yup from 'yup';

type Options = Partial<yup.TestMessageParams>;

type ErrorWithTranslationOptions = {
  key: string;
  values: Record<string, string>;
};

function getTranslatedValues(values?: Options): Options | undefined {
  if (!values) {
    return;
  }

  if (!values.label) {
    return values;
  }

  return {
    ...values,
    label: i18n.t(values.label),
  };
}

function yupErrorReconciler(
  error: ErrorWithTranslationOptions | string
): [string, Options?] {
  if (typeof error === 'string') {
    return [error];
  }

  const translatedValues = getTranslatedValues(error.values);

  return [error.key, translatedValues];
}

export default yupErrorReconciler;
