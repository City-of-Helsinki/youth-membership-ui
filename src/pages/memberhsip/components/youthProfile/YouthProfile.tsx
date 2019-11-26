import React from 'react';
import { RouteChildrenProps } from 'react-router';

import PageLayout from '../../../../common/layout/PageLayout';
import YouthProfileForm from '../youthProfileForm/YouthProfileForm';
import styles from './YouthProflle.module.css';

type Props = RouteChildrenProps & {};

function Registration(props: Props) {
  return (
    <PageLayout background="youth">
      <div className={styles.form}>
        <YouthProfileForm />
      </div>
    </PageLayout>
  );
}

export default Registration;
