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
  dayOfMonth?: string;
  month?: string;
  year?: string;
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
  onBlur?: () => void;
}

export type DateError = {
  name: string;
  description: string;
};

interface Props {
  onChange: (date: Date) => void;
  onError: (error: DateError) => void;
  onBlur?: () => void;
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

function formatDateComponent(dateComponent: string): string {
  if (dateComponent.length === 1) {
    return `0${dateComponent}`;
  }

  return dateComponent;
}

function getDateComponents(date: Date | null): DateObject {
  if (!date) {
    return {};
  }

  const dayOfMonth = formatDateComponent(date.getDate().toString());
  const month = formatDateComponent(date.getMonth().toString());
  const year = date.getFullYear().toString();

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
    return new Date(
      Number(date.year),
      Number(date.month) - 1,
      Number(date.dayOfMonth),
      0,
      0,
      0,
      0
    );
  }

  return null;
}

function getIsDateExists(userGivenDate?: string, dateObjectDate?: number) {
  if (userGivenDate && dateObjectDate) {
    // Casting to a number removes possible leading zeroes which could
    // cause the dates to not match even they implicitly do.
    return Number(userGivenDate) === dateObjectDate;
  }

  return true;
}

function getCharacterCount(number: string): number {
  return number.length;
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

function parseNumberFromValue(value: string, maxCharacterCount = 2): string {
  // Removes all other characters than numbers from the result. This is
  // a last fallback which makes negative numbers positive and removes
  // possible characters from the output. The behavior of
  // input[type="number"] is not consistent between platforms.
  const sanitized = sanitizeInput(value);
  const maxSized = cutToLength(sanitized, maxCharacterCount);

  return maxSized;
}

function DateInputLogic({
  onChange,
  onError,
  onBlur,
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

  const setExternalDate = (date: DateObject) => {
    const nextDayOfMonth = defaultTo(date.dayOfMonth, internalDate.dayOfMonth);
    const nextDate = makeDate(date);
    const isDateExists = getIsDateExists(nextDayOfMonth, nextDate?.getDate());

    if (!isDateExists) {
      onError({
        name: 'dateDoesNotExist',
        description:
          'The combination of day, month and year do not result in a date that actually exists.',
      });
    }

    if (isDateExists && nextDate) {
      onChange(nextDate);
    }
  };

  const updateDate = (
    dayOfMonth: string | null,
    month: string | null,
    year: string | null
  ) => {
    setInternalDate(previousDate => {
      const nextCachedDate = {
        dayOfMonth: defaultTo(dayOfMonth, previousDate.dayOfMonth),
        month: defaultTo(month, previousDate.month),
        year: defaultTo(year, previousDate.year),
      };

      setExternalDate(nextCachedDate);

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

    updateDate(null, nextMonth, null);
    focusWhen(getCharacterCount(nextMonth) === 2, yearInputRef);
  };
  const handleYearChange = (event: React.FormEvent<HTMLInputElement>) => {
    const nextYear = parseNumberFromValue(event.currentTarget.value, 4);

    updateDate(null, null, nextYear);
  };

  const formattedMonth = internalDate.month;

  return React.createElement(wrapper, { isInvalid, onBlur }, [
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
