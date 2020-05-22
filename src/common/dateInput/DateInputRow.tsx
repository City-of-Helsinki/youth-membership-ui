import React from 'react';
import classNames from 'classnames';

import { WrapperComponentProps } from './DateInputLogic';
import styles from './dateInputRow.module.css';

function DateInputRow({ isInvalid, ...rest }: WrapperComponentProps) {
  return (
    <div
      {...rest}
      className={classNames(styles.row, { [styles.invalid]: isInvalid })}
    />
  );
}

export default DateInputRow;
