import { useCallback, useMemo } from 'react';
import {
  useField as useFieldFormik,
  FieldAttributes,
  FieldMetaProps,
  FieldInputProps as FFFieldInputProps,
  FieldHelperProps,
} from 'formik';
import { useTranslation } from 'react-i18next';

import yupErrorReconciler from '../../../common/helpers/yupErrorReconciler';

function getIsInvalid(touched: boolean, error?: string): boolean {
  const isTouched = Boolean(touched);
  const isError = Boolean(error);

  return isTouched && isError;
}

type FieldInputProps<T> = FFFieldInputProps<T> & {
  invalid: boolean;
  errorText?: string;
};
type Config<T> = string | FieldAttributes<T>;

function useField<T>(
  config: Config<T>
): [FieldInputProps<T>, FieldMetaProps<T>, FieldHelperProps<T>] {
  const [fieldProps, fieldMeta, fieldHelpers] = useFieldFormik<T>(config);
  const { t } = useTranslation();

  const getErrorText = useCallback(
    (isInvalid: boolean, error?: string) => {
      if (!isInvalid || !error) {
        return;
      }

      return t(...yupErrorReconciler(error));
    },
    [t]
  );

  const isInvalid = useMemo(
    () => getIsInvalid(fieldMeta.touched, fieldMeta.error),
    [fieldMeta.touched, fieldMeta.error]
  );
  const errorText = useMemo(() => getErrorText(isInvalid, fieldMeta.error), [
    isInvalid,
    fieldMeta.error,
    getErrorText,
  ]);
  const extendedFieldProps = useMemo(
    () => ({
      ...fieldProps,
      invalid: isInvalid,
      errorText,
    }),
    [isInvalid, errorText, fieldProps]
  );

  return [extendedFieldProps, fieldMeta, fieldHelpers];
}

export default useField;
