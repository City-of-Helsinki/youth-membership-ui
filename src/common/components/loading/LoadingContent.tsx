import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import defaultTo from 'lodash/defaultTo';

import Loading from './Loading';
import styles from './loadingContent.module.css';

type Props = React.PropsWithChildren<{
  isLoading: boolean;
  loadingText?: string;
  loadingClassName?: string;
}>;

function LoadingContent({
  isLoading = false,
  loadingClassName,
  loadingText,
  children,
}: Props) {
  const { t } = useTranslation();

  const loadingTextWithDefault = defaultTo(loadingText, t('loading'));

  return (
    <Loading
      loadingClassName={classNames(styles.loader, loadingClassName)}
      isLoading={isLoading}
      loadingText={loadingTextWithDefault}
      defer={500}
    >
      {children}
    </Loading>
  );
}

export default LoadingContent;
