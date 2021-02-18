import React from 'react';
import 'hds-core/lib/components/text-input/text-input.css';

import DateInputLabel from './DateInputLabel';

const INPUT_GROUP_ID = 'ym-date-picker-group';

interface Props {
  children: React.ReactNode;
  id?: string;
  label: string;
  error?: string | null;
}

function DateGroup({ children, id = INPUT_GROUP_ID, label, error }: Props) {
  const isInvalid = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div
      role="group"
      aria-labelledby={id}
      aria-describedby={errorId}
      className="hds-text-input"
    >
      <DateInputLabel id={id}>{label}</DateInputLabel>
      {children}
      {isInvalid && (
        <span id={errorId} className="hds-text-input__error-text">
          {error}
        </span>
      )}
    </div>
  );
}

export default DateGroup;
