import React from 'react';
import { RouteChildrenProps } from 'react-router';

import PageLayout from '../../common/layout/PageLayout';
import RegistrationForm from '../../common/registrationForm/RegistrationForm';
import styles from './Registration.module.css';

type Props = RouteChildrenProps & {};

function Registration(props: Props) {
  return (
    <PageLayout background="youth">
      <div className={styles.form}>
        <RegistrationForm />
      </div>
    </PageLayout>
  );
}

export default Registration;
