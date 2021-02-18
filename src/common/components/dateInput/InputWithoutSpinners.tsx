import React from 'react';
import { TextInputProps } from 'hds-react';

import TextInput from '../textInput/TextInput';
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
