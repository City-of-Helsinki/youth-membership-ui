import React from 'react';
import { Field, FieldProps } from 'formik';
import { TextInput, TextInputProps } from 'hds-react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

type Props = TextInputProps;

function FormikTestInput(props: Props) {
  const { t } = useTranslation();

  const getError = ({
    field,
    form,
  }: FieldProps<string>): string | undefined => {
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

  const getHelperText = (
    fieldProps: FieldProps<string>
  ): string | undefined => {
    const isInvalid = getIsInvalid(fieldProps);
    const error = getError(fieldProps);

    if (!isInvalid || !error) {
      return props.helperText;
    }

    return t(error);
  };

  return (
    <Field name={props.name}>
      {(fieldProps: FieldProps<string>) => (
        <TextInput
          {...fieldProps.field}
          invalid={getIsInvalid(fieldProps)}
          helperText={getHelperText(fieldProps)}
          {...props}
        />
      )}
    </Field>
  );
}

export default FormikTestInput;
