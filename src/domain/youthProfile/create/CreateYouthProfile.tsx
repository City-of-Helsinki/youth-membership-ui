/* eslint-disable sort-keys */
import React from 'react';
import { User } from 'oidc-client';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import { isValid, parseISO } from 'date-fns';

import {
  Language,
  PrefillRegistartion,
  YouthLanguage,
  PrefillRegistartion_myProfile_primaryAddress as PrimaryAddress,
} from '../../../graphql/generatedTypes';
import toastNotification from '../../../common/components/notification/toastNotification';
import getCookie from '../../../common/helpers/getCookie';
import getLanguageCode from '../../../common/helpers/getLanguageCode';
import getAddressesFromNode from '../../membership/helpers/getAddressesFromNode';
import YouthProfileForm, {
  Values as FormValues,
} from '../form/YouthProfileForm';
import styles from './createYouthProfile.module.css';
import useCreateProfiles from '../hooks/useCreateProfiles';

type Props = {
  tunnistamoUser: User;
  prefillRegistrationData: PrefillRegistartion;
};

function CreateYouthProfile({
  tunnistamoUser,
  prefillRegistrationData,
}: Props) {
  const { i18n } = useTranslation();
  const [createProfiles, { loading }] = useCreateProfiles({
    onError: () => toastNotification({}),
  });

  const birthDate = getCookie('birthDate');
  const isBirthDateValid = isValid(parseISO(birthDate));

  const handleOnValues = (formValues: FormValues) => {
    createProfiles(formValues, prefillRegistrationData);
  };

  const formatLocale = (locale: string) => {
    switch (locale) {
      case 'fi':
        return 'FINNISH';
      case 'en':
        return 'ENGLISH';
      case 'sv':
        return 'SWEDISH';
      default:
        return 'FINNISH';
    }
  };
  // These allow us to set initial value of languageAtHome & profileLanguage
  // to users current language.
  const currentLangForProfile: Language = formatLocale(
    getLanguageCode(i18n.languages[0])
  ) as Language;
  const currentLangForYouth: YouthLanguage = formatLocale(
    getLanguageCode(i18n.languages[0])
  ) as YouthLanguage;

  if (!isBirthDateValid) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.form}>
      <YouthProfileForm
        profile={{
          firstName: prefillRegistrationData?.myProfile?.firstName || '',
          lastName: prefillRegistrationData?.myProfile?.lastName || '',
          primaryAddress:
            prefillRegistrationData?.myProfile?.primaryAddress ||
            ({} as PrimaryAddress),
          addresses: getAddressesFromNode('prefill', prefillRegistrationData),
          email: tunnistamoUser.profile.email || '',
          phone: prefillRegistrationData?.myProfile?.primaryPhone?.phone || '',
          birthDate,
          approverEmail: '',
          schoolName: '',
          schoolClass: '',
          approverFirstName: '',
          approverLastName: '',
          approverPhone: '',
          profileLanguage:
            prefillRegistrationData?.myProfile?.language ||
            Language[currentLangForProfile],
          languageAtHome: YouthLanguage[currentLangForYouth],
          photoUsageApproved: 'false',
          additionalContactPersons: [],
        }}
        isSubmitting={loading}
        onValues={handleOnValues}
      />
    </div>
  );
}

export default CreateYouthProfile;
