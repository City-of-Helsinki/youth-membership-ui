import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

import styles from './toastNotification.module.css';
import NotificationComponent from '../../components/notification/NotificationComponent';

const options: ToastOptions = {
  autoClose: false,
  className: styles.toastBody,
  bodyClassName: styles.toastBody,
};

export type NotificationOptions = {
  labelText?: string;
  notificationMessage?: string;
  type?: 'info' | 'success' | 'alert' | 'error';
  onClose?: () => void;
};

const toastNotification = (notificationOptions?: NotificationOptions) => {
  toast(<NotificationComponent {...notificationOptions} />, options);
};
export default toastNotification;
