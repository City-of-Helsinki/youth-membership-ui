import React from 'react';
import defaultTo from 'lodash/defaultTo';

const DATE_INPUT_ALLOWED_CHARACTERS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
const INPUT_CONFIGS = {
  // We are invoking type number in order to allow platforms invoke
  // behavior that allows more convenient  number input.
  type: 'number',
  // Sets the minimum allowed number as 0 for chrome controls. The user
  // is still able to input a negative number by hand if they choose.
  min: 0,
  // Forces the number keyboard on mobile devices
  inputMode: 'numeric',
  // 1) Ensures that a number pad is shown on iOS instead of the regular
  // keyboard
  // 2) Blocks iOS devices from inputting characters other than numbers
  pattern: '\\d*',
};

type DateObject = {
  dayOfMonth?: number;
  month?: number;
  year?: number;
};

export interface InputComponentProps {
  id: string;
  name: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  min: number;
  pattern: string;
  type: string;
  isInvalid: boolean;
  label: string;
}

export interface WrapperComponentProps {
  children?: React.ReactNode;
  isInvalid: boolean;
}

interface Props {
  onChange: (date: Date) => void;
  wrapper: React.FC<WrapperComponentProps>;
  value: Date | null;
  isInvalid: boolean;
  dateInputId: string;
  monthInputId: string;
  yearInputId: string;
  dateInputName: string;
  monthInputName: string;
  yearInputName: string;
  dayOfMonthComponent: React.FC<InputComponentProps>;
  monthComponent: React.FC<InputComponentProps>;
  yearComponent: React.FC<InputComponentProps>;
  dateInputLabel: string;
  monthInputLabel: string;
  yearInputLabel: string;
}

function getDateComponents(date: Date | null): DateObject {
  if (!date) {
    return {};
  }

  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return {
    dayOfMonth,
    month,
    year,
  };
}

function makeDate(date: DateObject): Date | null {
  if (
    date.year !== undefined &&
    date.month !== undefined &&
    date.dayOfMonth !== undefined
  ) {
    return new Date(date.year, date.month, date.dayOfMonth, 0, 0, 0, 0);
  }

  return null;
}

function getCharacterCount(number: number): number {
  return number.toString().length;
}

function sanitizeInput(content: unknown) {
  return String(content)
    .split('')
    .filter(character => DATE_INPUT_ALLOWED_CHARACTERS.includes(character))
    .join('');
}

function cutToLength(string: string, length: number) {
  if (string.length <= length) {
    return string;
  }

  return string.slice(0, length);
}

function parseNumberFromValue(value: string, maxCharacterCount = 2): number {
  // Removes all other characters than numbers from the result. This is
  // a last fallback which makes negative numbers positive and removes
  // possible characters from the output. The behavior of
  // input[type="number"] is not consistent between platforms.
  const sanitized = sanitizeInput(value);
  const maxSized = cutToLength(sanitized, maxCharacterCount);

  return Number(maxSized);
}

function DateInputLogic({
  onChange,
  value,
  isInvalid,
  wrapper,
  dateInputId,
  monthInputId,
  yearInputId,
  dateInputName,
  monthInputName,
  yearInputName,
  dayOfMonthComponent,
  monthComponent,
  yearComponent,
  dateInputLabel,
  monthInputLabel,
  yearInputLabel,
}: Props) {
  const externalDate = getDateComponents(value);
  const [internalDate, setInternalDate] = React.useState<DateObject>(
    externalDate
  );
  const monthInputRef = React.useRef(null);
  const yearInputRef = React.useRef(null);

  const updateDate = (
    dayOfMonth: number | null,
    month: number | null,
    year: number | null
  ) => {
    setInternalDate(previousDate => {
      const nextCachedDate = {
        dayOfMonth: defaultTo(dayOfMonth, previousDate.dayOfMonth),
        month: defaultTo(month, previousDate.month),
        year: defaultTo(year, previousDate.year),
      };
      const nextDate = makeDate(nextCachedDate);

      if (nextDate) {
        onChange(nextDate);
      }

      return nextCachedDate;
    });
  };

  const focusWhen = (
    condition: boolean,
    element: React.RefObject<HTMLInputElement>
  ) => {
    if (condition && element.current) {
      element.current.focus();
    }
  };

  const handleDayOfMonthChange = (event: React.FormEvent<HTMLInputElement>) => {
    const nextDayOfMonth = parseNumberFromValue(event.currentTarget.value);

    updateDate(nextDayOfMonth, null, null);
    focusWhen(getCharacterCount(nextDayOfMonth) === 2, monthInputRef);
  };
  const handleMonthChange = (event: React.FormEvent<HTMLInputElement>) => {
    const nextMonth = parseNumberFromValue(event.currentTarget.value);
    // User's input month number, we save month index into state
    const nextMonthIndex = nextMonth - 1;

    updateDate(null, nextMonthIndex, null);
    focusWhen(getCharacterCount(nextMonth) === 2, yearInputRef);
  };
  const handleYearChange = (event: React.FormEvent<HTMLInputElement>) => {
    const nextYear = parseNumberFromValue(event.currentTarget.value, 4);

    updateDate(null, null, nextYear);
  };

  const formattedMonth =
    internalDate.month !== undefined
      ? (internalDate.month + 1).toString()
      : undefined;

  return React.createElement(wrapper, { isInvalid }, [
    React.createElement(dayOfMonthComponent, {
      key: dateInputId,
      id: dateInputId,
      name: dateInputName,
      value: defaultTo(internalDate.dayOfMonth?.toString(), ''),
      onChange: handleDayOfMonthChange,
      isInvalid,
      label: dateInputLabel,
      ...INPUT_CONFIGS,
    }),
    React.createElement(monthComponent, {
      key: monthInputId,
      id: monthInputId,
      name: monthInputName,
      value: defaultTo(formattedMonth, ''),
      onChange: handleMonthChange,
      innerRef: monthInputRef,
      isInvalid,
      label: monthInputLabel,
      ...INPUT_CONFIGS,
    }),
    React.createElement(yearComponent, {
      key: yearInputId,
      id: yearInputId,
      name: yearInputName,
      value: defaultTo(internalDate.year?.toString(), ''),
      onChange: handleYearChange,
      innerRef: yearInputRef,
      isInvalid,
      label: yearInputLabel,
      ...INPUT_CONFIGS,
    }),
  ]);
}

export default DateInputLogic;
