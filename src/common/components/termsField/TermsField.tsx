import React from 'react';
import { Checkbox, CheckboxProps } from 'hds-react';
import { useField } from 'formik';
import { Trans, useTranslation } from 'react-i18next';

import styles from './termsField.module.css';

type Props = {
  name: string;
} & CheckboxProps;

function TermsField(props: Props) {
  const { name } = props;
  const { t } = useTranslation();
  const [field, meta] = useField(name);

  return (
    <div>
      <Checkbox
        {...props}
        {...field}
        type="checkbox"
        checked={Boolean(field.value)}
        label={
          <span className={styles.listLabel}>
            <Trans
              i18nKey="approval.approveTerms"
              components={[
                // These components receive content  in the
                // translation definition.
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href={t('registry.descriptionLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                />,
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href={t('privacyPolicy.helsinkiProfileLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                />,
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href={t('privacyPolicy.descriptionLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                />,
              ]}
            />
          </span>
        }
      />
      {meta.error && meta.touched && (
        <p className={styles.errorText}>{t(meta.error)}</p>
      )}
    </div>
  );
}

export default TermsField;
