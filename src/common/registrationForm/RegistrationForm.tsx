import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';

import styles from './Registration.module.css';

type Props = {};

function RegistrationForm(props: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('registration.title')}</h1>
      <p>
        Tähän lisätietoja mitä jäsenyydellä saa, mitä jäsenyydellä saa ja mihin
        käytetään.
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
          <TextInput className={styles.childBirthay} id="birthDay" value="" />
          <TextInput
            className={styles.childBirthay}
            hideLabel={true}
            id="birthMonth"
            value=""
          />
          <TextInput className={styles.childBirthay} id="birthYear" value="" />
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
