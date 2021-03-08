import React from 'react';

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '../../../../../common/test/testing-library';
import BirthdateForm from '../BirthdateForm';

const renderForm = (props = {}) => render(<BirthdateForm {...props} />);

const fillDate = (d, m, y) => {
  fireEvent.change(screen.getByLabelText('Päivä'), { target: { value: d } });
  fireEvent.change(screen.getByLabelText('Kuukausi'), { target: { value: m } });
  fireEvent.change(screen.getByLabelText('Vuosi'), { target: { value: y } });
  screen.getByRole('button', { name: 'Hanki jäsenyys' }).focus();
};

describe('<BirthdateForm />', () => {
  it('should call redirectBasedOnAge with a formatted date on submit', async () => {
    const redirectBasedOnAge = jest.fn();

    renderForm({ redirectBasedOnAge });

    fillDate('2', '2', '2006');

    fireEvent.click(screen.getByRole('button', { name: 'Hanki jäsenyys' }));

    await waitFor(() =>
      expect(redirectBasedOnAge).toHaveBeenLastCalledWith('2006-02-02')
    );
  });

  it('should show a an invalid date error when the date is invalid', async () => {
    renderForm();
    fillDate('32', '2', '2006');

    await waitFor(() =>
      expect(screen.getByText('Päivämäärä ei kelpaa')).toBeInTheDocument()
    );
  });
});
