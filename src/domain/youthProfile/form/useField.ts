import {
  useField as useFieldFormik,
  FieldAttributes,
  FieldMetaProps,
} from 'formik';
import { useTranslation } from 'react-i18next';

import yupErrorReconciler from '../../../common/helpers/yupErrorReconciler';

function getIsInvalid<T>(fieldProps: FieldMetaProps<T>): boolean {
  const { error, touched } = fieldProps;
  const isTouched = Boolean(touched);
  const isError = Boolean(error);

  return isTouched && isError;
}

type Config<T> = string | FieldAttributes<T>;

function useField<T>(config: Config<T>) {
  const [fieldProps, fieldMeta] = useFieldFormik(config);
  const { t } = useTranslation();

  function getErrorText<A>(fieldProps: FieldMetaProps<A>) {
    const isInvalid = getIsInvalid(fieldProps);
    const error = fieldProps.error;

    if (!isInvalid || !error) {
      return;
    }

    return t(...yupErrorReconciler(error));
  }

  const isInvalid = getIsInvalid(fieldMeta);
  const errorText = getErrorText(fieldMeta);

  return [
    {
      ...fieldProps,
      invalid: isInvalid,
      errorText,
    },
    fieldMeta,
  ];
}

export default useField;
