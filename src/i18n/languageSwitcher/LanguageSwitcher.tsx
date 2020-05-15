import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'fi', twoPartCode: 'fi-FI', label: 'Suomi' },
  { code: 'sv', twoPartCode: 'sv-SV', label: 'Svenska' },
  { code: 'en', twoPartCode: 'en-US', label: 'English' },
];

type Props = {
  onLanguageChanged?: () => void;
  className?: string;
};

function LanguageSwitcher(props: Props) {
  const { i18n } = useTranslation();
  const setLanguage = (code: string) => {
    i18n.changeLanguage(code);
    if (props.onLanguageChanged) {
      props.onLanguageChanged();
    }
  };

  return (
    <ul className={classNames(props.className, styles.list)}>
      {languages
        .filter(
          lang =>
            lang.code !== i18n.languages[0] &&
            lang.twoPartCode !== i18n.languages[0]
        )
        .map(lang => (
          <li key={lang.code} className={styles.item}>
            <button
              type="button"
              lang={lang.code}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
            </button>
          </li>
        ))}
    </ul>
  );
}

export default LanguageSwitcher;
