import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

import ageConstants from './constants/ageConstants';

const isConsentRequired = (birthDate: string, schema: Yup.StringSchema) => {
  const userAge = differenceInYears(new Date(), new Date(birthDate));
  return userAge < ageConstants.ADULT
    ? schema.required('validation.required')
    : schema;
};

const requireIfNotAdult = (extendedSchema: Yup.StringSchema) => {
  return extendedSchema.when(
    ['birthDate'],
    (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
  );
};

const approverFirstNameSchema = Yup.string()
  .min(2, 'validation.tooShort')
  .max(255, 'validation.tooLong');
const approverLastNameSchema = Yup.string()
  .min(2, 'validation.tooShort')
  .max(255, 'validation.tooLong');
const approverEmailSchema = Yup.string().email('validation.email');
const approverPhoneSchema = Yup.string().min(6, 'validation.phoneMin');

const additionalContactPersonsSchema = Yup.array(
  Yup.object({
    firstName: Yup.string().required('validation.required'),
    lastName: Yup.string().required('validation.required'),
    phone: Yup.string().required('validation.required'),
    email: Yup.string().required('validation.required'),
  })
);

const basicInformationSchema = Yup.object().shape({
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
});

const additionalInformationSchema = Yup.object().shape({
  schoolName: Yup.string().max(128, 'validation.tooLong'),
  schoolClass: Yup.string().max(10, 'validation.tooLong'),
  photoUsageApproved: Yup.string().required('validation.required'),
});

const youthApproverSchema = Yup.object().shape({
  approverFirstName: requireIfNotAdult(approverFirstNameSchema),
  approverLastName: requireIfNotAdult(approverLastNameSchema),
  approverPhone: requireIfNotAdult(approverPhoneSchema),
  approverEmail: requireIfNotAdult(approverEmailSchema),
  additionalContactPersons: additionalContactPersonsSchema,
});

const guardianApproverSchema = Yup.object().shape({
  approverFirstName: approverFirstNameSchema.required('validation.required'),
  approverLastName: approverLastNameSchema.required('validation.required'),
  approverEmail: approverEmailSchema.required('validation.required'),
  phone: approverPhoneSchema.required('validation.required'),
  additionalContactPersons: additionalContactPersonsSchema,
});

const termsSchema = Yup.object().shape({
  terms: Yup.boolean().oneOf([true], 'validation.required'),
});

export const approveYouthProfileFormSchema = guardianApproverSchema.concat(
  termsSchema
);

export const youthProfileFormSchema = basicInformationSchema
  .concat(additionalInformationSchema)
  .concat(youthApproverSchema)
  .concat(termsSchema);
