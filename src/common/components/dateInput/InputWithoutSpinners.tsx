import React from 'react';
import { TextInput, TextInputProps } from 'hds-react';

import styles from './inputWithoutSpinners.module.css';

type Props = TextInputProps;

const InputWithoutSpinners = React.forwardRef(
  ({ className, ...rest }: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <TextInput
        ref={ref}
        {...rest}
        className={[styles.noSpinner, className].filter(item => item).join(' ')}
      />
    );
  }
);

export default InputWithoutSpinners;
