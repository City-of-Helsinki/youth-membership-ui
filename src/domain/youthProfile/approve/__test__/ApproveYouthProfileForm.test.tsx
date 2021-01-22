import React from 'react';
import { mount } from 'enzyme';
import { subYears, format } from 'date-fns';
import { render } from '@testing-library/react';

import ApproveYouthProfileForm, {
  FormValues,
} from '../ApproveYouthProfileForm';
import { YouthLanguage } from '../../../../graphql/generatedTypes';

const defaultProps = {
  profile: {
    firstName: 'Teemu',
    lastName: 'Testaaja',
    birthDate: `${format(subYears(new Date(), 14), 'yyyy')}-01-01`,
    address: 'Testikuja 55, 00100 Helsinki',
    addresses: ['Kymintie 43, 00100 Helsinki'],
    email: 'teemu.testaaja@test.fi',
    languageAtHome: YouthLanguage.FINNISH,
    phone: '050123467',
    language: YouthLanguage.FINNISH,
    schoolClass: 'Luokka',
    schoolName: 'Koulu',
    photoUsageApproved: 'false',
    approverFirstName: 'Ville',
    approverLastName: 'Vanhempi',
    approverEmail: 'ville.vanhempi@test.fi',
    approverPhone: '05012345567',
    additionalContactPersons: [],
  } as FormValues,
  isSubmitting: false,
  onSubmit: jest.fn(),
};

type Props = {
  profile?: FormValues;
};

const getWrapper = (props: Props) => {
  const combinedProps = {
    ...defaultProps,
    profile: {
      ...defaultProps.profile,
      ...props.profile,
    },
  };
  return mount(<ApproveYouthProfileForm {...combinedProps} />);
};

test('matches snapshot', () => {
  const wrapper = render(<ApproveYouthProfileForm {...defaultProps} />);
  expect(wrapper.container).toMatchSnapshot();
});

test('input fields are pre-filled', () => {
  const wrapper = mount(<ApproveYouthProfileForm {...defaultProps} />);
  const approverFirstName = wrapper.find('input[id="approverFirstName"]');
  const approverLastName = wrapper.find('input[id="approverLastName"]');
  const approverEmail = wrapper.find('input[id="approverEmail"]');
  const approverPhone = wrapper.find('input[id="approverPhone"]');

  expect(approverFirstName.props().value).toEqual('Ville');
  expect(approverLastName.props().value).toEqual('Vanhempi');
  expect(approverEmail.props().value).toEqual('ville.vanhempi@test.fi');
  expect(approverPhone.props().value).toEqual('05012345567');
});

describe('photoUsageTests', () => {
  test('child is under 15 and photoUsageApproved is shown', () => {
    const childAge = format(subYears(new Date(), 14), 'yyyy-MMM-dd');
    const wrapper = getWrapper({
      profile: { birthDate: childAge } as FormValues,
    });
    const photoUsage = wrapper.find('input[name="photoUsageApproved"]');
    expect(photoUsage).toBeTruthy();
  });

  test('child is 15 or older and photoUsageApproved is hidden', () => {
    const childAge = format(subYears(new Date(), 15), 'yyyy-MMM-dd');
    const wrapper = getWrapper({
      profile: { birthDate: childAge } as FormValues,
    });
    const photoUsage = wrapper.find('input[name="photoUsageApproved"]');
    expect(photoUsage.length).toEqual(0);
  });
});
