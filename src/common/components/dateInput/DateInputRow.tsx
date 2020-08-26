import React, { useRef } from 'react';
import classNames from 'classnames';

import useFocusWithinOut from './useFocusWithinOut';
import { WrapperComponentProps } from './DateInputLogic';
import styles from './dateInputRow.module.css';

function DateInputRow({ isInvalid, onBlur, ...rest }: WrapperComponentProps) {
  const wrapperElement = useRef(null);
  useFocusWithinOut(wrapperElement, onBlur);

  return (
    <div
      {...rest}
      ref={wrapperElement}
      className={classNames(styles.row, { [styles.invalid]: isInvalid })}
    />
  );
}

export default DateInputRow;
