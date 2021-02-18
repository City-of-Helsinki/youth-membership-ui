import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconLinkExternal } from 'hds-react';

import styles from './externalLink.module.css';

type Props = React.PropsWithChildren<{
  href: string;
  className?: string;
}>;

const ExternalLink = ({ href, children, className, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      className={[styles.externalLink, className].join(' ')}
    >
      {children} <IconLinkExternal aria-label={t('externalLink.description')} />
    </a>
  );
};

export default ExternalLink;
