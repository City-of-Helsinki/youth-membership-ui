import React from 'react';
import { TextInputProps } from 'hds-react';

import TextInput from '../../../common/components/textInput/TextInput';
import useField from './useField';

type Props = TextInputProps & {
  name: string;
};

function FormikTextInput(props: Props) {
  const [field] = useField(props.name);

  return <TextInput {...field} {...props} />;
}

export default FormikTextInput;
