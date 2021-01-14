import React from 'react';
import { TextInput as HDSTextInput, TextInputProps } from 'hds-react';

import styles from './textInput.module.css';

// We add a class that's used to make input's behave better in grid
// layouts.
const TextInput = ({ className, ...rest }: TextInputProps) => (
  <HDSTextInput
    {...rest}
    className={[styles.input, className].filter(item => item).join(' ')}
  />
);

export default TextInput;
