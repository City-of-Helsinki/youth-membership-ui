import React from 'react';
import classNames from 'classnames';
import ReactSelect, { ValueType } from 'react-select';

import './Select.css';

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  id?: string;
  name: string;
  labelText?: string;
  value?: string | undefined;
  className?: string;
  options: Option[];
  setFieldValue: (name: string, value: string) => void;
};

const Select = (props: Props) => {
  // Without this defaultValue is not set / language wont get updated
  const value = props.options.find(option => option.value === props.value);

  return (
    <div className={classNames('wrapper', props.className)}>
      <label htmlFor={props.name} className="select-label">
        {props.labelText}
      </label>

      <ReactSelect
        onChange={(event: ValueType<any>) =>
          props.setFieldValue(props.name, event?.value)
        }
        id={props.id}
        name={props.name}
        className="select"
        classNamePrefix="select"
        options={props.options}
        value={value || {}}
      />
    </div>
  );
};

export default Select;
