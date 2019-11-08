import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import PageLayout from '../../common/layout/PageLayout';
import RegistrationForm from '../../common/registrationForm/RegistrationForm';
import styles from './Registration.module.css';

type Props = RouteChildrenProps & {};

function Registration(props: Props) {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      <PageLayout>
        <div className={styles.form}>
          <RegistrationForm />
        </div>
      </PageLayout>
    </Formik>
  );
}

export default Registration;
