import React from 'react';
import toJson from 'enzyme-to-json';

import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  getByLabelText,
} from '../../../test/testing-library';
import DateInput from '../DateInput';

describe('<DateInput />', () => {
  const dateInputLabel = 'date-input';
  const monthInputLabel = 'month-input';
  const yearInputLabel = 'year-input';
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    onError: jest.fn(),
    dateInputLabel,
    monthInputLabel,
    yearInputLabel,
  };
  const getWrapper = props =>
    render(<DateInput {...defaultProps} {...props} />);
  const dateInputSelector = container =>
    getByLabelText(container, dateInputLabel);
  const monthInputSelector = container =>
    getByLabelText(container, monthInputLabel);
  const yearInputSelector = container =>
    getByLabelText(container, yearInputLabel);

  it('should render expectedly', () => {
    expect(toJson(getWrapper())).toMatchSnapshot();
  });

  it('should yield expected dates', () => {
    const onChange = jest.fn();
    const { container } = getWrapper({ onChange });

    fireEvent.change(dateInputSelector(container), {
      target: { value: '2' },
    });
    fireEvent.change(monthInputSelector(container), {
      target: { value: '2' },
    });
    fireEvent.change(yearInputSelector(container), {
      target: { value: '2020' },
    });

    expect(onChange).toHaveBeenCalledWith(new Date(2020, 1, 2, 0, 0, 0, 0));
  });

  it('should not allow text to be inputted', () => {
    const { container, queryByDisplayValue } = getWrapper();

    const testNoTextAllowed = inputSelector => {
      const testString = 'text';

      fireEvent.change(inputSelector(container), {
        target: { value: testString },
      });

      expect(queryByDisplayValue(testString)).toEqual(null);
    };

    testNoTextAllowed(dateInputSelector);
    testNoTextAllowed(monthInputSelector);
    testNoTextAllowed(yearInputSelector);
  });

  it('should not allow negative numbers', () => {
    const { container, queryByDisplayValue } = getWrapper();

    const testNoNegativeAllowed = (inputSelector, testValue) => {
      fireEvent.change(inputSelector(container), {
        target: { value: `-${testValue}` },
      });

      expect(queryByDisplayValue(`-${testValue}`)).toEqual(null);
      expect(queryByDisplayValue(testValue.toString())).toBeDefined();
    };

    testNoNegativeAllowed(dateInputSelector, 3);
    testNoNegativeAllowed(monthInputSelector, 4);
    testNoNegativeAllowed(yearInputSelector, 2015);
  });

  it('should have a maximum character count of 2 for date and month fields, and 4 for year field', () => {
    const { container, queryByDisplayValue } = getWrapper();

    const testNoTooLongNumberAllowed = (inputSelector, numberLength) => {
      const forSureTooLongTestValue = Array.from({ length: 1000 })
        .map(() => 'a')
        .join('');

      fireEvent.change(inputSelector(container), {
        target: { value: forSureTooLongTestValue },
      });

      const expectedValue = forSureTooLongTestValue.slice(0, numberLength);

      expect(queryByDisplayValue(forSureTooLongTestValue)).toEqual(null);
      expect(queryByDisplayValue(expectedValue)).toBeDefined();
    };

    testNoTooLongNumberAllowed(dateInputSelector, 2);
    testNoTooLongNumberAllowed(monthInputSelector, 2);
    testNoTooLongNumberAllowed(yearInputSelector, 4);
  });

  it('should yield a valid date when month is january', () => {
    const onChange = jest.fn();
    const { container } = getWrapper({ onChange });

    fireEvent.change(dateInputSelector(container), {
      target: { value: '1' },
    });
    fireEvent.change(monthInputSelector(container), {
      target: { value: '1' },
    });
    fireEvent.change(yearInputSelector(container), {
      target: { value: '2017' },
    });

    expect(onChange).toHaveBeenCalledWith(new Date(2017, 0, 1, 0, 0, 0, 0));
  });

  it('should not accept invalid dates', () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const { container } = getWrapper({ onChange, onError });

    fireEvent.change(dateInputSelector(container), {
      target: { value: '31' },
    });
    fireEvent.change(monthInputSelector(container), {
      target: { value: '2' },
    });
    fireEvent.change(yearInputSelector(container), {
      target: { value: '2020' },
    });

    // Does not send invalid date
    expect(onChange.mock.calls.length).toEqual(0);
    // Sends an error instead
    expect(onError.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "description": "The combination of day, month and year do not result in a date that actually exists.",
        "name": "dateDoesNotExist",
      }
    `);
  });

  it('should allow the user to input leading zeroes to day and month inputs', () => {
    const testContent = '01';
    const { container } = getWrapper();

    const testLeadingZeroesAllowed = inputSelector => {
      fireEvent.change(inputSelector(container), {
        target: { value: testContent },
      });

      expect(inputSelector(container).value).toEqual(testContent);
    };

    testLeadingZeroesAllowed(dateInputSelector);
    testLeadingZeroesAllowed(monthInputSelector);
  });
});
