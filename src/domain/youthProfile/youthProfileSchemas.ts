import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';

import ageConstants from './constants/ageConstants';

const isConsentRequired = (birthDate: string, schema: Yup.StringSchema) => {
  const userAge = differenceInYears(new Date(), new Date(birthDate));
  return userAge < ageConstants.ADULT ? schema.required() : schema;
};

const requireIfNotAdult = (extendedSchema: Yup.StringSchema) => {
  return extendedSchema.when(
    ['birthDate'],
    (birthDate: string, schema: Yup.StringSchema) =>
      isConsentRequired(birthDate, schema)
  );
};

const approverFirstNameSchema = Yup.string()
  .min(2)
  .max(255)
  .label('fields.firstName');
const approverLastNameSchema = Yup.string()
  .min(2)
  .max(255)
  .label('fields.lastName');
const approverEmailSchema = Yup.string()
  .email()
  .label('fields.email');
const approverPhoneSchema = Yup.string()
  .min(6)
  .label('fields.phoneNumber');
const languageAtHomeSchema = Yup.string().oneOf([
  'FINNISH',
  'SWEDISH',
  'ENGLISH',
  'FRENCH',
  'RUSSIAN',
  'SOMALI',
  'ARABIC',
  'ESTONIAN',
]);

const additionalContactPersonsSchema = Yup.array(
  Yup.object({
    firstName: Yup.string()
      .required()
      .label('fields.firstName'),
    lastName: Yup.string()
      .required()
      .label('fields.lastName'),
    phone: Yup.string()
      .required()
      .label('fields.phoneNumber'),
    email: Yup.string()
      .required()
      .label('fields.email'),
  })
);

const basicInformationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2)
    .max(255)
    .required()
    .label('fields.firstName'),
  lastName: Yup.string()
    .min(2)
    .max(255)
    .required()
    .label('fields.lastName'),
  primaryAddress: Yup.object().shape({
    address: Yup.string()
      .min(2)
      .max(255)
      .required()
      .label('fields.streetAddress'),
    postalCode: Yup.mixed()
      .required()
      .label('fields.postalCode')
      .test('isValidPostalCode', 'validation.invalidPostalCode', function() {
        if (postcodeValidatorExistsForCountry(this.parent.countryCode)) {
          return postcodeValidator(
            this.parent.postalCode,
            this.parent.countryCode
          );
        }
        return this.parent?.postalCode?.length < 32;
      }),
    city: Yup.string()
      .min(2)
      .max(255)
      .required()
      .label('fields.city'),
  }),
  addresses: Yup.array().of(
    Yup.object().shape({
      address: Yup.string()
        .min(2)
        .max(255),
      postalCode: Yup.mixed().test(
        'isValidPostalCode',
        'validation.invalidPostalCode',
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
        .min(2)
        .max(255),
    })
  ),
  phone: Yup.string()
    .min(6)
    .required()
    .label('fields.phoneNumber'),
});

const additionalInformationSchema = Yup.object().shape({
  schoolName: Yup.string()
    .max(128)
    .label('fields.schoolName'),
  schoolClass: Yup.string()
    .max(10)
    .label('fields.schoolClass'),
  photoUsageApproved: Yup.string()
    .required()
    .label('fields.photoUsageApproved'),
});

const youthApproverSchema = Yup.object().shape({
  approverFirstName: requireIfNotAdult(approverFirstNameSchema),
  approverLastName: requireIfNotAdult(approverLastNameSchema),
  approverPhone: requireIfNotAdult(approverPhoneSchema),
  approverEmail: requireIfNotAdult(approverEmailSchema),
  additionalContactPersons: additionalContactPersonsSchema,
  // The API doesn't allow for this field to be unset, but according to
  // the design it should be an optional field for adults and a required
  // field for minors. Hence we apply the same logic to it.

  // In the UI layer, only options that are valid as far as the API is
  // concerned are provided, and one of them is always selected by
  // default.
  languageAtHome: requireIfNotAdult(languageAtHomeSchema),
});

const guardianApproverSchema = Yup.object().shape({
  approverFirstName: approverFirstNameSchema
    .required()
    .label('fields.firstName'),
  approverLastName: approverLastNameSchema.required().label('fields.lastName'),
  approverEmail: approverEmailSchema.required().label('fields.approverEmail'),
  phone: approverPhoneSchema.required().label('fields.phoneNumber'),
  additionalContactPersons: additionalContactPersonsSchema,
});

const termsSchema = Yup.object().shape({
  terms: Yup.boolean().oneOf([true], 'validation.requiredTerms'),
});

export const approveYouthProfileFormSchema = guardianApproverSchema.concat(
  termsSchema
);

export const youthProfileFormSchema = basicInformationSchema
  .concat(additionalInformationSchema)
  .concat(youthApproverSchema)
  .concat(termsSchema);
