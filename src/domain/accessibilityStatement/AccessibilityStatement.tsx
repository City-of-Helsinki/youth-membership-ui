import React from 'react';
import { useTranslation } from 'react-i18next';

import getLanguageCode from '../../common/helpers/getLanguageCode';
import PageContent from '../../common/components/layout/PageContent';
import styles from './AccessibilityStatement.module.css';
import AccessibilityStatementFi from './AccessibilityStatementFi';
import AccessibilityStatementEn from './AccessibilityStatementEn';
import AccessibilityStatementSv from './AccessibilityStatementSv';

function AccessibilityStatement() {
  const { i18n } = useTranslation();
  const selectStatement = () => {
    const lang = getLanguageCode(i18n.languages[0]);

    switch (lang) {
      case 'fi':
        return <AccessibilityStatementFi />;
      case 'en':
        return <AccessibilityStatementEn />;
      case 'sv':
        return <AccessibilityStatementSv />;
      default:
        return <p>Invalid language.</p>;
    }
  };
  return (
    <>
      <div className={styles.background} />
      <PageContent>
        <div className={styles.innerWrapper}>{selectStatement()}</div>
      </PageContent>
    </>
  );
}

export default AccessibilityStatement;
