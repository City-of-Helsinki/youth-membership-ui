import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, FormikProps } from 'formik';
import countries from 'i18n-iso-countries';
import { format } from 'date-fns';

import { AddressType } from '../../../graphql/generatedTypes';
import getLanguageCode from '../../../common/helpers/getLanguageCode';
import Select from '../../../common/components/select/Select';
import ArrayFieldTemplate from '../../../common/components/arrayFieldTemplate/ArrayFieldTemplate';
import Stack from '../../../common/components/stack/Stack';
import TextInput from './FormikTextInput';
import YouthProfileAddressTemplate from './YouthProfileAddressTemplate';
import YouthProfileFormGrid from './YouthProfileFormGrid';
import { FormValues, Values } from './YouthProfileForm';

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
    <Stack space="l">
      <YouthProfileFormGrid>
        <TextInput
          id="firstName"
          name="firstName"
          labelText={t('registration.firstName') + ' *'}
          autoComplete="given-name"
        />
        <TextInput
          id="lastName"
          name="lastName"
          labelText={t('registration.lastName') + ' *'}
          autoComplete="family-name"
        />
      </YouthProfileFormGrid>
      <Stack space="s">
        <YouthProfileFormGrid>
          <Field
            as={Select}
            setFieldValue={formikProps.setFieldValue}
            id="primaryAddress.countryCode"
            name="primaryAddress.countryCode"
            type="select"
            options={countryOptions}
            labelText={t('registration.country')}
            autoComplete="country-name"
          />
        </YouthProfileFormGrid>
        <YouthProfileAddressTemplate
          address={
            <TextInput
              id="primaryAddress.address"
              name="primaryAddress.address"
              labelText={t('registration.address') + ' *'}
              autoComplete="address-line1"
            />
          }
          postalCode={
            <TextInput
              id="primaryAddress.postalCode"
              name="primaryAddress.postalCode"
              inputMode={
                formikProps.values?.primaryAddress?.countryCode === 'FI'
                  ? 'numeric'
                  : 'text'
              }
              labelText={t('registration.postalCode') + ' *'}
              autoComplete="postal-code"
            />
          }
          city={
            <TextInput
              id="primaryAddress.city"
              name="primaryAddress.city"
              labelText={t('registration.city') + ' *'}
              autoComplete="address-level2"
            />
          }
        />
      </Stack>
      <Stack space="m">
        <ArrayFieldTemplate
          name="addresses"
          listSpace="s"
          renderField={(value, index, namePath) => (
            <Stack space="s">
              <YouthProfileFormGrid>
                <Field
                  as={Select}
                  setFieldValue={formikProps.setFieldValue}
                  id={`${namePath}.countryCode`}
                  name={`${namePath}.countryCode`}
                  type="select"
                  options={countryOptions}
                  labelText={t('registration.country')}
                />
              </YouthProfileFormGrid>
              <YouthProfileAddressTemplate
                address={
                  <TextInput
                    id={`${namePath}.address`}
                    name={`${namePath}.address`}
                    labelText={t('registration.address')}
                  />
                }
                postalCode={
                  <TextInput
                    id={`${namePath}.postalCode`}
                    name={`${namePath}.postalCode`}
                    inputMode={
                      formikProps.values?.primaryAddress?.countryCode === 'FI'
                        ? 'numeric'
                        : 'text'
                    }
                    labelText={t('registration.postalCode')}
                  />
                }
                city={
                  <TextInput
                    id={`${namePath}.city`}
                    name={`${namePath}.city`}
                    labelText={t('registration.city')}
                  />
                }
              />
            </Stack>
          )}
          addItemLabel={t('registration.addAddress')}
          onPushItem={push =>
            push({
              address: '',
              postalCode: '',
              countryCode: 'FI',
              city: '',
              primary: false,
              addressType: AddressType.OTHER,
              __typeName: 'AddressNode',
            })
          }
        />
      </Stack>
      <YouthProfileFormGrid>
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
          labelText={t('registration.profileLanguage')}
          autoComplete="language"
        />
        <Field
          as={TextInput}
          id="email"
          name="email"
          type="text"
          labelText={t('registration.email')}
          readOnly
          autoComplete="email"
        />
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          labelText={t('registration.phoneNumber') + ' *'}
          autoComplete="tel"
        />
      </YouthProfileFormGrid>
    </Stack>
  );
}

export default YouthProfileFormBasicInformationFields;
