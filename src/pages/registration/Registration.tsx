import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { TextInput } from 'hds-react';

import PageLayout from '../../common/layout/PageLayout';
import styles from './Registration.module.css';

type Props = RouteChildrenProps & {};

function Registration(props: Props) {
  return (
    <PageLayout>
      <div className={styles.form}>
        <h1>Täytä tietosi</h1>
        <TextInput labelText="Etunimi" id="firstname" />
      </div>
    </PageLayout>
  );
}

export default Registration;
