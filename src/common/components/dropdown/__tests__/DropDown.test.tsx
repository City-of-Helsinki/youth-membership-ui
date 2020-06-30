import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

/* eslint-disable import/named */
import { render, fireEvent, getByText } from '../../../test/testing-library';
/* eslint-enable import/named */
import Dropdown, { DropdownOption } from '../Dropdown';

const dropDownOptions: DropdownOption[] = [
  {
    id: '123',
    label: 'Teemu Testaaja',
  },
  {
    id: '234',
    label: 'Profile information',
  },
];

test('matches snapshot', () => {
  const wrapper = shallow(<Dropdown options={dropDownOptions} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

test('clicking name will open dropdown', () => {
  const { container } = render(<Dropdown options={dropDownOptions} />);
  const button = getByText(container, 'Teemu Testaaja');

  fireEvent.click(button);

  const dropDownContent = container.querySelector('.dropdownContent');
  const profileButton = getByText(container, 'Profile information');

  expect(dropDownContent).toBeTruthy();
  expect(profileButton).toBeTruthy();
});
