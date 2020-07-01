import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconPlusCircle } from 'hds-react';
import { Field, FieldArray, FieldArrayRenderProps, FormikProps } from 'formik';
import countries from 'i18n-iso-countries';
import { format } from 'date-fns';

import { AddressType } from '../../../graphql/generatedTypes';
import getLanguageCode from '../../../common/helpers/getLanguageCode';
import Select from '../../../common/components/select/Select';
import TextInput from './FormikTextInput';
import { FormValues, Values } from './YouthProfileForm';
import styles from './youthProfileForm.module.css';

type Props = {
  profile: Values;
  formikProps: FormikProps<FormValues>;
};

function YouthProfileFormBasicInformationFields({
  profile,
  formikProps,
}: Props) {
  const { t, i18n } = useTranslation();

  const applicationLanguageCode = getLanguageCode(i18n.languages[0]);
  const countryList = countries.getNames(applicationLanguageCode);
  const countryOptions = Object.keys(countryList).map(key => {
    return {
      value: key,
      label: countryList[key],
    };
  });

  return (
    <>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="firstName"
          name="firstName"
          labelText={t('registration.firstName') + ' *'}
        />
        <TextInput
          className={styles.formInput}
          id="lastName"
          name="lastName"
          labelText={t('registration.lastName') + ' *'}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          as={Select}
          setFieldValue={formikProps.setFieldValue}
          id="primaryAddress.countryCode"
          name="primaryAddress.countryCode"
          type="select"
          options={countryOptions}
          className={styles.formInput}
          labelText={t('registration.country')}
        />
      </div>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="primaryAddress.address"
          name="primaryAddress.address"
          labelText={t('registration.address') + ' *'}
        />
        <div className={styles.formInputRow}>
          <TextInput
            className={styles.formInputPostal}
            id="primaryAddress.postalCode"
            name="primaryAddress.postalCode"
            inputMode={
              formikProps.values?.primaryAddress?.countryCode === 'FI'
                ? 'numeric'
                : 'text'
            }
            labelText={t('registration.postalCode') + ' *'}
          />
          <TextInput
            className={styles.formInputCity}
            id="primaryAddress.city"
            name="primaryAddress.city"
            labelText={t('registration.city') + ' *'}
          />
        </div>
      </div>
      <FieldArray
        name="addresses"
        render={(arrayHelpers: FieldArrayRenderProps) => (
          <React.Fragment>
            {formikProps.values.addresses.map((address, index: number) => (
              <React.Fragment key={index}>
                <div className={styles.formRow}>
                  <Field
                    as={Select}
                    setFieldValue={formikProps.setFieldValue}
                    id={`addresses.${index}.countryCode`}
                    name={`addresses.${index}.countryCode`}
                    type="select"
                    options={countryOptions}
                    className={styles.formInput}
                    labelText={t('registration.country')}
                  />
                </div>
                <div className={styles.formRow}>
                  <TextInput
                    className={styles.formInput}
                    id={`addresses.${index}.address`}
                    name={`addresses.${index}.address`}
                    labelText={t('registration.address')}
                  />

                  <div className={styles.formInputRow}>
                    <TextInput
                      className={styles.formInputPostal}
                      id={`addresses.${index}.postalCode`}
                      name={`addresses.${index}.postalCode`}
                      inputMode={
                        formikProps.values?.primaryAddress?.countryCode === 'FI'
                          ? 'numeric'
                          : 'text'
                      }
                      labelText={t('registration.postalCode')}
                    />
                    <TextInput
                      className={styles.formInputCity}
                      id={`addresses.${index}.city`}
                      name={`addresses.${index}.city`}
                      labelText={t('registration.city')}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.additionalActionButton}
                  onClick={() => arrayHelpers.remove(index)}
                >
                  {t('registration.remove')}
                </button>
              </React.Fragment>
            ))}
            <br />
            <Button
              type="button"
              iconLeft={<IconPlusCircle />}
              className={styles.addAdditional}
              variant="supplementary"
              onClick={() =>
                arrayHelpers.push({
                  address: '',
                  postalCode: '',
                  countryCode: 'FI',
                  city: '',
                  primary: false,
                  addressType: AddressType.OTHER,
                  __typeName: 'AddressNode',
                })
              }
            >
              {t('registration.addAddress')}
            </Button>
          </React.Fragment>
        )}
      />
      <div className={styles.formRow}>
        <Field
          as={TextInput}
          id="birthDate"
          name="birthDate"
          readOnly
          value={
            profile.birthDate &&
            format(new Date(profile.birthDate), 'dd.MM.yyyy')
          }
          labelText={t('registration.childBirthDay')}
          className={styles.formInput}
        />
        <Field
          as={Select}
          setFieldValue={formikProps.setFieldValue}
          id="profileLanguage"
          name="profileLanguage"
          type="select"
          options={[
            { value: 'FINNISH', label: t('LANGUAGE_OPTIONS.FINNISH') },
            { value: 'ENGLISH', label: t('LANGUAGE_OPTIONS.ENGLISH') },
            { value: 'SWEDISH', label: t('LANGUAGE_OPTIONS.SWEDISH') },
          ]}
          className={styles.formInput}
          labelText={t('registration.profileLanguage')}
        />
      </div>
      <div className={styles.formRow}>
        <Field
          as={TextInput}
          id="email"
          name="email"
          type="text"
          labelText={t('registration.email')}
          className={styles.formInput}
          readOnly
        />
        <TextInput
          className={styles.formInput}
          id="phone"
          name="phone"
          type="tel"
          labelText={t('registration.phoneNumber') + ' *'}
        />
      </div>
    </>
  );
}

export default YouthProfileFormBasicInformationFields;
