import React from 'react';
import { Field, FieldProps } from 'formik';
import { TextInputProps } from 'hds-react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

import yupErrorReconciler from '../../../common/helpers/yupErrorReconciler';
import TextInput from '../../../common/components/textInput/TextInput';

type Props = TextInputProps;

function FormikTestInput(props: Props) {
  const { t } = useTranslation();

  const getError = ({
    field,
    form,
  }: FieldProps<string>):
    | string
    | { key: string; values: Record<string, string> }
    | undefined => {
    const fieldName = field.name;

    return get(form.errors, fieldName);
  };

  const getIsInvalid = (fieldProps: FieldProps<string>): boolean => {
    const { field, form } = fieldProps;
    const fieldName = field.name;
    const isTouched = Boolean(get(form.touched, fieldName));
    const isError = Boolean(getError(fieldProps));

    return isTouched && isError;
  };

  const getErrorText = (fieldProps: FieldProps<string>) => {
    const isInvalid = getIsInvalid(fieldProps);
    const error = getError(fieldProps);

    if (!isInvalid || !error) {
      return;
    }

    return t(...yupErrorReconciler(error));
  };

  return (
    <Field name={props.name}>
      {(fieldProps: FieldProps<string>) => (
        <TextInput
          {...fieldProps.field}
          invalid={getIsInvalid(fieldProps)}
          errorText={getErrorText(fieldProps)}
          {...props}
        />
      )}
    </Field>
  );
}

export default FormikTestInput;
