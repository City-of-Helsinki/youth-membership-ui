import React from 'react';
import { connect } from 'formik';
import { PrefillRegistartion_myProfile_addresses_edges_node as Address } from '../../../graphql/generatedTypes';
import scrollToElement from 'scroll-to-element';

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
  duration: 1000,
};

function FormikFocusError({ formik }: any) {
  const { errors, isSubmitting } = formik;
  const keys = Object.keys(errors);

  if (keys.length > 0 && isSubmitting) {
    let selector = `[name="${keys[0]}"`;
    let errorElement = document.querySelector(selector);

    if (keys[0] === 'primaryAddress') {
      const primaryAddressKeys = Object.keys(errors.primaryAddress);
      selector = `[name="primaryAddress.${primaryAddressKeys[0]}"`;
      errorElement = document.querySelector(selector);
    }

    if (keys[0] === 'addresses') {
      const indexes = errors.addresses
        .map((address: Address, index: number) => {
          if (address?.postalCode) return index;
          return false;
        })
        .filter((index: number) => index);

      selector = `[name="addresses.${indexes[0]}.postalCode"`;
      errorElement = document.querySelector(selector);
    }

    if (errorElement) {
      scrollToElement(errorElement, defaultConfig);

      setTimeout(() => {
        (errorElement as HTMLInputElement).focus();
      }, defaultConfig.duration + defaultConfig.focusDelay);
    }
  }

  return null;
}

export default connect(FormikFocusError);
