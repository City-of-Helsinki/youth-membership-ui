import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'fi', label: 'Suomi' },
  { code: 'sv', label: 'Svenska' },
  { code: 'en', label: 'English' },
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

  const filteredLanguages = languages.filter(lang => {
    if (i18n.languages[0].length > 2) {
      return i18n.languages[0].substr(0, 2) !== lang.code;
    }
    return i18n.languages[0] !== lang.code;
  });

  return (
    <ul className={classNames(props.className, styles.list)}>
      {filteredLanguages.map(lang => (
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
