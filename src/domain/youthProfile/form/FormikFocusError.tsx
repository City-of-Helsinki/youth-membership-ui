import { FormikErrors, useFormikContext } from 'formik';
import scrollToElement from 'scroll-to-element';

import { FormValues } from './YouthProfileForm';

interface ScrollConfig {
  offset: number;
  align?: 'top' | 'middle' | 'bottom';
  focusDelay: number;
  ease?: string;
  duration: number;
}

const defaultConfig: ScrollConfig = {
  offset: -30,
  align: 'top',
  focusDelay: 200,
  ease: 'linear',
  duration: 800,
};

const getErrorElement = (errors: FormikErrors<FormValues>, key: string) => {
  switch (key) {
    case 'primaryAddress':
      const primaryKeys = Object.keys(errors.primaryAddress as {});
      return document.querySelector(`[name="primaryAddress.${primaryKeys[0]}"`);
    case 'addresses':
      const firstIndex = (errors.addresses as []).findIndex(error => error);
      // postalCode is only validated field in additional addresses
      return document.querySelector(
        `[name="addresses.${firstIndex}.postalCode"`
      );
    default:
      return document.querySelector(`[name="${key}"`);
  }
};

function FormikFocusError() {
  const { errors, isSubmitting, isValidating } = useFormikContext<FormValues>();
  const keys = Object.keys(errors);

  if (keys.length > 0 && isSubmitting && !isValidating) {
    const errorElement = getErrorElement(errors, keys[0]);

    // Scroll only happens when element is out of view.
    if (errorElement && errorElement.getBoundingClientRect().top < 0) {
      scrollToElement(errorElement, defaultConfig);

      setTimeout(() => {
        (errorElement as HTMLInputElement).focus();
      }, defaultConfig.duration + defaultConfig.focusDelay);
    }
  }

  return null;
}

export default FormikFocusError;
