import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  waitFor,
} from '../../../../common/test/testing-library';
import FormikTextInput from '../FormikTextInput';

describe('<FormikTextInput />', () => {
  const defaultProps = {};
  const label = 'label';
  const testValue = 'test value';
  const errorMessage = 'error message';
  const getWrapper = (props: unknown = {}) =>
    render(
      <Formik
        initialValues={{
          testValue,
        }}
        validationSchema={yup.object({
          testValue: yup.string().required(errorMessage),
        })}
        onSubmit={() => {
          // pass
        }}
      >
        <FormikTextInput
          id="testValue"
          name="testValue"
          labelText={label}
          {...defaultProps}
          {...props}
        />
      </Formik>
    );

  it('should find value from Formik', () => {
    const { getByDisplayValue } = getWrapper();

    expect(getByDisplayValue(testValue)).toBeDefined();
  });

  it('should show error when invalid', async () => {
    const { getByLabelText, getByText } = getWrapper();
    const input = getByLabelText(label);

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeDefined();
    });
  });
});
