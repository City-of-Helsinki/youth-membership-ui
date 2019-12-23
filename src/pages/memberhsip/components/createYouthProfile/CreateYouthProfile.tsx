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
  AddressType,
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
        addAddresses: [
          {
            address: formValues.address,
            postalCode: formValues.postalCode,
            city: formValues.city,
            primary: true,
            addressType: AddressType.OTHER,
          },
        ],
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
        youthProfile: {
          birthDate: formValues.birthDate,
          schoolName: formValues.schoolName,
          schoolClass: formValues.schoolClass,
          approverFirstName: formValues.approverFirstName,
          approverLastName: formValues.approverLastName,
          approverPhone: formValues.approverPhone,
          approverEmail: formValues.approverEmail,
          //TODO: Waiting to be fixed in backend
          //photoUsageApproved: formValues.photoUsageApproved,
          //languageAtHome: formValues.languageAtHome,
        },
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
          address: '',
          postalCode: '',
          city: '',
          email: tunnistamoUser.profile.email,
          phone: '',
          birthDate: '',
          approverEmail: '',
          schoolName: '',
          schoolClass: '',
          approverFirstName: '',
          approverLastName: '',
          approverPhone: '',
          //TODO: Waiting to be fixed in backend
          //photoUsageApproved: false,
          //languageAtHome: '',
        }}
        isSubmitting={loading}
        onValues={handleOnValues}
      />
    </div>
  );
}

export default CreateYouthProflle;
