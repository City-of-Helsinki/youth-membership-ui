import React from 'react';
import { MemoryRouter } from 'react-router';
import { loader } from 'graphql.macro';

import { membershipDetailsData } from '../../../../../common/test/membershipDetailsData';
import RegistrationInformation from '../MembershipDetails';
import {
  mountWithApolloProvider,
  updateWrapper,
} from '../../../../../common/test/testUtils';

const MEMBERSHIP_DETAILS = loader('../../../graphql/MembershipDetails.graphql');

const mocks = [
  {
    request: {
      query: MEMBERSHIP_DETAILS,
      variables: {},
    },
    result: {
      data: membershipDetailsData,
      loading: false,
    },
  },
];

const expectedValues = [
  { label: 'Nimi', value: 'Teemu Testaaja' },
  { label: 'Osoite', value: 'Testikatu 55, 12345, Helsinki, Suomi' },
  { label: 'Osoite', value: 'Testikatu 66, 00100, Helsinki, Suomi' },
  { label: 'Sähköposti', value: 'teemu@testaaja.com' },
  { label: 'Puhelinnumero', value: '0501234567' },
  { label: 'Syntymäpäivä', value: '1.1.2000' },
  { label: 'Profiilin kieli', value: 'Suomi' },
  { label: 'Koulu', value: 'School, Class' },
  { label: 'Kotona puhuttu kieli', value: 'Suomi' },
  { label: 'Kuvauslupa', value: 'Ei' },
  { label: 'Nimi', value: 'Ville Vanhempi' },
  { label: 'Sähköposti', value: 'ville@vanhempi.com' },
  { label: 'Puhelin', value: '0501234567' },
];

const getWrapper = () => {
  return mountWithApolloProvider(
    <MemoryRouter>
      <RegistrationInformation />
    </MemoryRouter>,
    mocks
  );
};

type ComponentValues = {
  label: string;
  value: string;
};

test('all data is present', async () => {
  const wrapper = getWrapper();
  await updateWrapper(wrapper);

  const labeledValues = wrapper.find('.wrapper');

  const componentValues: ComponentValues[] = labeledValues.map(subWrapper => {
    const label = subWrapper.find('.label');
    const value = subWrapper.find('.value');
    return {
      label: label.text(),
      value: value.text(),
    };
  });

  expect(componentValues).toEqual(expectedValues);
});
