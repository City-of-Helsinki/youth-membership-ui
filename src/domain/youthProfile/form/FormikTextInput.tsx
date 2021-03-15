import React from 'react';
import { TextInputProps } from 'hds-react';

import TextInput from '../../../common/components/textInput/TextInput';
import useField from './useField';

type Props = TextInputProps;

function FormikTextInput(props: Props) {
  const [field] = useField(props.name as string);

  return <TextInput {...field} {...props} />;
}

export default FormikTextInput;
