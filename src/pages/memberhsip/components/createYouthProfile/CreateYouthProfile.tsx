/* eslint-disable sort-keys */
import React from 'react';
import { User } from 'oidc-client';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import YouthProfileForm, {
  FormValues,
} from '../createYouthProfileForm/CreateYouthProfileForm';
import styles from './CreateYouthProflle.module.css';
import {
  CreateProfile as CreateProfileData,
  CreateProfileVariables,
} from '../../graphql/__generated__/CreateProfile';
import {
  EmailType,
  PhoneType,
} from '../../../../graphql/__generated__/globalTypes';

const CREATE_PROFILE = loader('../../graphql/CreateProfile.graphql');

type Props = {
  tunnistamoUser: User;
  onProfileCreated: () => void;
};

function CreateYouthProflle({ tunnistamoUser, onProfileCreated }: Props) {
  const [createProfile, { loading }] = useMutation<
    CreateProfileData,
    CreateProfileVariables
  >(CREATE_PROFILE);
  const handleOnValues = (formValues: FormValues) => {
    const variables: CreateProfileVariables = {
      profile: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        addEmails: [
          {
            email: formValues.email,
            primary: true,
            emailType: EmailType.OTHER,
          },
        ],
        addPhones: [
          formValues.phone
            ? {
                phone: formValues.phone,
                primary: true,
                phoneType: PhoneType.OTHER,
              }
            : null,
        ],
      },
    };
    createProfile({ variables }).then(result => {
      if (result.data) {
        onProfileCreated();
      }
    });
  };
  return (
    <div className={styles.form}>
      <YouthProfileForm
        profile={{
          firstName: tunnistamoUser.profile.given_name,
          lastName: tunnistamoUser.profile.family_name,
          email: tunnistamoUser.profile.email,
          phone: '',
        }}
        isSubmitting={loading}
        onValues={handleOnValues}
      />
    </div>
  );
}

export default CreateYouthProflle;
