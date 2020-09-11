import React from 'react';

import Text from '../text/Text';
import PageSection from './PageSection';
import PageContent from './PageContent';
import styles from './infoPageLayout.module.css';

type Props = {
  title: string;
  description: string;
};

const InfoPageLayout = ({ title, description }: Props) => {
  return (
    <PageContent>
      <PageSection className={styles.centerText}>
        <Text variant="h1">{title}</Text>
        <Text variant="info">{description}</Text>
      </PageSection>
    </PageContent>
  );
};

export default InfoPageLayout;
