import React from 'react';
import { useTranslation } from 'react-i18next';

import getLanguageCode from '../../common/helpers/getLanguageCode';
import PageWrapper from '../../common/components/wrapper/PageWrapper';
import styles from './AccessibilityStatement.module.css';
import Header from '../../common/components/header/Header';
import Footer from '../../common/components/footer/Footer';
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
    <PageWrapper>
      <div className={styles.pageWrapper}>
        <Header />
        <div className={styles.container}>
          <div className={styles.innerWrapper}>{selectStatement()}</div>
        </div>
        <Footer />
      </div>
    </PageWrapper>
  );
}

export default AccessibilityStatement;
