import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { TextInput } from 'hds-react';

import PageLayout from '../../common/layout/PageLayout';
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
          <h1>{t('registration.title')}</h1>
          <p>
            Tähän lisätietoja mitä jäsenyydellä saa, mitä jäsenyydellä saa ja
            mihin käytetään.
          </p>
          <h2>Perustiedot</h2>
          <form>
            <div className={styles.formRow}>
              <TextInput
                className={styles.formInput}
                labelText={t('registration.firstName')}
                id="firstName"
                value=""
              />
              <TextInput
                className={styles.formInput}
                labelText={t('registration.lastName')}
                id="lastName"
                value=""
              />
            </div>
            <div className={styles.formRow}>
              <TextInput
                className={styles.formInput}
                labelText={t('registration.street')}
                id="street"
                value=""
              />
              <TextInput
                className={styles.formInput}
                labelText={t('registration.postcode')}
                id="postcode"
                value=""
              />
              <TextInput
                className={styles.formInput}
                labelText={t('registration.city')}
                id="city"
                value=""
              />
            </div>
            <label>Syntymäpäivä</label>
            <div className={styles.formRow}>
              <TextInput
                className={styles.childBirthay}
                id="birthDay"
                value=""
              />
              <TextInput
                className={styles.childBirthay}
                hideLabel={true}
                id="birthMonth"
                value=""
              />
              <TextInput
                className={styles.childBirthay}
                id="birthYear"
                value=""
              />
            </div>
          </form>
        </div>
      </PageLayout>
    </Formik>
  );
}

export default Registration;
