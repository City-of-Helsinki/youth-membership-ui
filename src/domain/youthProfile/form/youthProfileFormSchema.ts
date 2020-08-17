import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

import ageConstants from '../constants/ageConstants';

const isConsentRequired = (birthDate: string, schema: Yup.StringSchema) => {
  const userAge = differenceInYears(new Date(), new Date(birthDate));
  return userAge < ageConstants.ADULT
    ? schema.required('validation.required')
    : schema;
};

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  lastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .required('validation.required'),
  primaryAddress: Yup.object().shape({
    address: Yup.string()
      .min(2, 'validation.tooShort')
      .max(255, 'validation.tooLong')
      .required('validation.required'),
    postalCode: Yup.mixed()
      .required('validation.required')
      .test('isValidPostalCode', 'validation.invalidValue', function() {
        if (postcodeValidatorExistsForCountry(this.parent.countryCode)) {
          return postcodeValidator(
            this.parent.postalCode,
            this.parent.countryCode
          );
        }
        return this.parent?.postalCode?.length < 32;
      }),
    city: Yup.string()
      .min(2, 'validation.tooShort')
      .max(255, 'validation.tooLong')
      .required('validation.required'),
  }),
  addresses: Yup.array().of(
    Yup.object().shape({
      address: Yup.string()
        .min(2, 'validation.tooShort')
        .max(255, 'validation.tooLong'),
      postalCode: Yup.mixed().test(
        'isValidPostalCode',
        'validation.invalidValue',
        function() {
          if (postcodeValidatorExistsForCountry(this.parent.countryCode)) {
            return postcodeValidator(
              this.parent.postalCode,
              this.parent.countryCode
            );
          }
          return this.parent?.postalCode?.length < 32;
        }
      ),
      city: Yup.string()
        .min(2, 'validation.tooShort')
        .max(255, 'validation.tooLong'),
    })
  ),
  phone: Yup.string()
    .min(6, 'validation.phoneMin')
    .required('validation.required'),
  schoolName: Yup.string().max(128, 'validation.tooLong'),
  schoolClass: Yup.string().max(10, 'validation.tooLong'),
  approverFirstName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverLastName: Yup.string()
    .min(2, 'validation.tooShort')
    .max(255, 'validation.tooLong')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverPhone: Yup.string()
    .min(6, 'validation.phoneMin')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  approverEmail: Yup.string()
    .email('validation.email')
    .when(['birthDate'], (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
    ),
  photoUsageApproved: Yup.string().required('validation.required'),
  terms: Yup.boolean().oneOf([true], 'validation.required'),
  additionalContactPersons: Yup.array(
    Yup.object({
      firstName: Yup.string().required('validation.required'),
      lastName: Yup.string().required('validation.required'),
      phone: Yup.string().required('validation.required'),
      email: Yup.string().required('validation.required'),
    })
  ),
});

export default schema;
