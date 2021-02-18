import React from 'react';
import { Checkbox, CheckboxProps } from 'hds-react';
import { useField } from 'formik';
import { Trans, useTranslation } from 'react-i18next';

import ExternalLink from '../externalLink/ExternalLink';
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
                <ExternalLink href={t('registry.descriptionLink')} />,
                <ExternalLink href={t('privacyPolicy.helsinkiProfileLink')} />,
                <ExternalLink href={t('privacyPolicy.descriptionLink')} />,
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
