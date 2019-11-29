/* eslint-disable sort-keys */
import React from 'react';
import { User } from 'oidc-client';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import YouthProfileForm, {
  FormValues,
} from '../createYouthProfileForm/CreateYouthProfileForm';
import styles from './CreateYouthProflle.module.css';

const CREATE_PROFILE = loader('../../graphql/createProfileMutation.graphql');

type Props = {
  tunnistamoUser: User;
  onProfileCreated: () => void;
};

function CreateYouthProflle({ tunnistamoUser, onProfileCreated }: Props) {
  const [createProfile, { loading }] = useMutation(CREATE_PROFILE);
  const handleOnValues = (profileData: FormValues) => {
    createProfile({ variables: { profile: profileData } }).then(result => {
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