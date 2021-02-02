import React from 'react';
import { Notification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { NotificationOptions as Props } from '../../helpers/toastNotification/toastNotification';
import styles from './NotificationComponent.module.css';

function NotificationComponent(props: Props) {
  const { t } = useTranslation();
  return (
    <Notification
      dismissible
      type={props.type || 'error'}
      label={props.labelText || t('notification.defaultErrorTitle')}
      closeButtonLabelText={t('notification.closeButtonText') as string}
      className={styles.notification}
      onClose={props.onClose}
    >
      <div className={styles.messageWrapper}>
        {props.notificationMessage || t('notification.defaultErrorText')}
      </div>
    </Notification>
  );
}

export default NotificationComponent;
