import React from 'react';
import { Select, SelectProps } from 'hds-react';

import useField from './useField';

type Option = {
  label: string;
  value: string;
};

type Props = SelectProps<Option> & {
  name: string;
  onChange?: (selected: Option) => void;
  value?: string;
  options: Option[];
};

const emptyValue = {
  label: '',
  value: '',
};

function FormikSelect({ name, value: userValue, options, ...rest }: Props) {
  const [{ value, ...field }, , helpers] = useField<string | string[]>(name);

  const handleChange = (selectedItem: Option | Option[]) => {
    if (Array.isArray(selectedItem)) {
      helpers.setValue(selectedItem.map(item => item.value));
    } else {
      helpers.setValue(selectedItem.value);
    }
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const usedValue = userValue || value;
  const valueAsOption = options.find(option => option.value === usedValue);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Select<Option>
      {...field}
      value={valueAsOption || emptyValue}
      onChange={handleChange}
      onBlur={handleBlur}
      options={options}
      {...rest}
    />
  );
}

export default FormikSelect;
