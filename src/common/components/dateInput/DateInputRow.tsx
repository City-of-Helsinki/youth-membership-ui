import React from 'react';
import classNames from 'classnames';

import { WrapperComponentProps } from './DateInputLogic';
import styles from './dateInputRow.module.css';

function DateInputRow({ isInvalid, onBlur, ...rest }: WrapperComponentProps) {
  return (
    <div
      {...rest}
      // In react div elements can have onBlur without any extra
      // configuration.
      onBlur={e => {
        // This onBlur handler captures all the blur events that happen
        // within it. For instance, the events created when moving
        // between inputs, bubble to this handler. For that purpose we
        // have to apply logic to ensure that we only call onBlur when
        // the focus leaves this wrapping component.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (e && !e.currentTarget.contains(e.relatedTarget) && onBlur) {
          onBlur();
        }
      }}
      className={classNames(styles.row, { [styles.invalid]: isInvalid })}
    />
  );
}

export default DateInputRow;
