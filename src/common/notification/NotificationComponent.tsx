import React, { PropsWithChildren } from 'react';
import { Notification } from 'hds-react';

import styles from './NotificationComponent.module.css';

type Props = PropsWithChildren<{
  show: boolean;
  labelText: string;
  type?: 'error' | 'success' | 'warning' | 'notification';
}>;

function NotificationComponent(props: Props) {
  if (!props.show) return null;

  return (
    <div className={styles.notification}>
      <Notification type={props.type} labelText={props.labelText}>
        {props.children}
      </Notification>
    </div>
  );
}

export default NotificationComponent;
