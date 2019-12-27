import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AcceptYouthProfileForm.module.css';
import LabeledValue from '../../../../common/labeledValue/LabeledValue';
//import getName from '../../../../helpers/getName';
//simport getAddress from '../../../../helpers/getAddress';

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  /**data*;*/
};

type Props = {
  profile: FormValues;
};

function AcceptYouthProfileForm(props: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.content}>
      <span className={styles.formTitleText}>
        <h2>{t('acceptance.title')}</h2>
        <p>
          {props.profile.firstName} {t('acceptance.formExplanationText_1')}{' '}
          {props.profile.firstName} {t('acceptance.formExplanationText_2')}
        </p>
      </span>
      <h3>{t('registration.basicInfo')}</h3>
      <div className={styles.formData}>
        <LabeledValue
          label={t('acceptance.name')}
          //use this below!
          //value={getName(data)}
          value={`${props.profile.firstName} ${props.profile.lastName}`}
        />
        <LabeledValue
          label={t('acceptance.address')}
          //use this below!
          //value={getAddress(data)}
          value={props.profile.address}
        />
        <LabeledValue
          label={t('acceptance.profile')}
          //use this below!
          //value={data....}
          value={props.profile.email}
        />
        <LabeledValue
          label={t('acceptance.phone')}
          //use this below!
          //value={data....}
          value={props.profile.phone}
        />

        <LabeledValue
          label={t('acceptance.phone')}
          //use this below!
          //value={data....}
          value="01.01.2006"
        />
      </div>
      <h3>{t('registration.addInfo')}</h3>
      <div className={styles.formData}>
        <LabeledValue
          label={t('acceptance.schoolInfo')}
          //use this below!
          //value={data...}
          value="The Skole, 3 A"
        />
        <LabeledValue
          label={t('acceptance.languagesAtHome')}
          //use this below!
          //value={data...}
          value="Suomi"
        />
      </div>
    </div>
  );
}

export default AcceptYouthProfileForm;
