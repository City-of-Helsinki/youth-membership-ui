import React from 'react';

import DateInputGroup from './DateInputGroup';
import DateInputLogic, {
  InputComponentProps,
  DateError,
} from './DateInputLogic';
import DateInputRow from './DateInputRow';
import InputWithoutSpinners from './InputWithoutSpinners';
import styles from './dateInput.module.css';

const DEFAULT_DATE_INPUT_DATE_ID = 'ym-date-input-date-id';
const DEFAULT_DATE_INPUT_MONTH_ID = 'ym-date-input-month-id';
const DEFAULT_DATE_INPUT_YEAR_ID = 'ym-date-input-year-id';
const DEFAULT_DATE_INPUT_DATE_NAME = 'ym-date-input-date-name';
const DEFAULT_DATE_INPUT_MONTH_NAME = 'ym-date-input-month-name';
const DEFAULT_DATE_INPUT_YEAR_NAME = 'ym-date-input-year-name';
const DEFAULT_DAY_OF_MONTH_INPUT = ({
  isInvalid,
  label,
  ...rest
}: InputComponentProps) => (
  <>
    <InputWithoutSpinners
      {...rest}
      invalid={isInvalid}
      hideLabel
      labelText={label}
    />
    <span className={styles.dot}>.</span>
  </>
);
const DEFAULT_MONTH_INPUT = ({
  innerRef,
  isInvalid,
  label,
  ...rest
}: InputComponentProps) => (
  <>
    <InputWithoutSpinners
      {...rest}
      invalid={isInvalid}
      ref={innerRef}
      hideLabel
      labelText={label}
    />
    <span className={styles.dot}>.</span>
  </>
);
const DEFAULT_YEAR_INPUT = ({
  innerRef,
  isInvalid,
  label,
  ...rest
}: InputComponentProps) => (
  <InputWithoutSpinners
    {...rest}
    invalid={isInvalid}
    ref={innerRef}
    hideLabel
    labelText={label}
  />
);

interface Props {
  onChange: (date: Date) => void;
  onError: (error: DateError) => void;
  onBlur?: () => void;
  value: Date | null;
  label: string;
  error?: string;
  dateInputId?: string;
  monthInputId?: string;
  yearInputId?: string;
  dateInputName?: string;
  monthInputName?: string;
  yearInputName?: string;
  dayOfMonthComponent?: React.FC<InputComponentProps>;
  monthComponent?: React.FC<InputComponentProps>;
  yearComponent?: React.FC<InputComponentProps>;
  dateInputLabel: string;
  monthInputLabel: string;
  yearInputLabel: string;
  dateInputAutoComplete?: string;
  monthInputAutoComplete?: string;
  yearInputAutoComplete?: string;
}

function DateInput({
  onChange,
  onError,
  onBlur,
  value,
  label,
  error,
  dateInputId = DEFAULT_DATE_INPUT_DATE_ID,
  monthInputId = DEFAULT_DATE_INPUT_MONTH_ID,
  yearInputId = DEFAULT_DATE_INPUT_YEAR_ID,
  dateInputName = DEFAULT_DATE_INPUT_DATE_NAME,
  monthInputName = DEFAULT_DATE_INPUT_MONTH_NAME,
  yearInputName = DEFAULT_DATE_INPUT_YEAR_NAME,
  dayOfMonthComponent = DEFAULT_DAY_OF_MONTH_INPUT,
  monthComponent = DEFAULT_MONTH_INPUT,
  yearComponent = DEFAULT_YEAR_INPUT,
  dateInputLabel,
  monthInputLabel,
  yearInputLabel,
  dateInputAutoComplete,
  monthInputAutoComplete,
  yearInputAutoComplete,
}: Props) {
  return (
    <DateInputGroup label={label} error={error}>
      <DateInputLogic
        onChange={onChange}
        onError={onError}
        onBlur={onBlur}
        value={value}
        isInvalid={Boolean(error)}
        wrapper={DateInputRow}
        dateInputId={dateInputId}
        monthInputId={monthInputId}
        yearInputId={yearInputId}
        dateInputName={dateInputName}
        monthInputName={monthInputName}
        yearInputName={yearInputName}
        dayOfMonthComponent={dayOfMonthComponent}
        monthComponent={monthComponent}
        yearComponent={yearComponent}
        dateInputLabel={dateInputLabel}
        monthInputLabel={monthInputLabel}
        yearInputLabel={yearInputLabel}
        dateInputAutoComplete={dateInputAutoComplete}
        monthInputAutoComplete={monthInputAutoComplete}
        yearInputAutoComplete={yearInputAutoComplete}
      />
    </DateInputGroup>
  );
}

export default DateInput;
