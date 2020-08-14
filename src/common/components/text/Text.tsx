import React, { ReactNode } from 'react';

import styles from './text.module.css';

type TextVariant = 'h1' | 'h2' | 'h3' | 'info' | 'body';

type Props = {
  variant: TextVariant;
  children: ReactNode;
  className?: string;
};

function getElement(variant: TextVariant) {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'info':
    case 'body':
    default:
      return 'p';
  }
}

function Text({ variant = 'body', children, className, ...rest }: Props) {
  return React.createElement(
    getElement(variant),
    {
      className: [styles.text, styles[variant], className].join(' '),
      ...rest,
    },
    children
  );
}

export default Text;
