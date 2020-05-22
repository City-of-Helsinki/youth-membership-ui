import React from 'react';
import 'hds-core/lib/components/text-input/text-input.css';

interface Props {
  children: React.ReactNode;
  id: string;
}

function DateInputLabel(props: Props) {
  return <span className="hds-text-input__label" {...props} />;
}

export default DateInputLabel;
