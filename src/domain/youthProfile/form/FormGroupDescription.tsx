import React from 'react';
import { useField } from 'formik';

import Text from '../../../common/components/text/Text';

type Props = {
  name: string;
  description: string;
  className?: string;
};

const FormGroupDescription = ({ className, name, description }: Props) => {
  const [{ value }] = useField(name);
  if (value?.length === 0) return null;
  return (
    <Text variant="info" className={className}>
      {description}
    </Text>
  );
};

export default FormGroupDescription;
