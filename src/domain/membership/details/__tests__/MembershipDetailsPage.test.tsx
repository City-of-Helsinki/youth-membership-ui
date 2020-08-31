import React from 'react';
import { MemoryRouter } from 'react-router';
import { loader } from 'graphql.macro';

import { membershipDetailsData } from '../../../../common/test/membershipDetailsData';
import MembershipDetailsPage from '../MembershipDetailsPage';
import {
  mountWithApolloProvider,
  updateWrapper,
} from '../../../../common/test/testUtils';

const MEMBERSHIP_DETAILS = loader('../../graphql/MembershipDetails.graphql');

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
  { label: 'Syntymäpäivä', value: '1.1.2000' },
  { label: 'Sähköposti', value: 'teemu@testaaja.com' },
  { label: 'Puhelinnumero', value: '0501234567' },
  { label: 'Profiilin kieli', value: 'Suomi' },
  { label: 'Osoite', value: 'Testikatu 55, 12345, Helsinki, Suomi' },
  { label: 'Osoite 2', value: 'Testikatu 66, 00100, Helsinki, Suomi' },
  { label: 'Koulu', value: 'School, Class' },
  { label: 'Kotona puhuttu kieli', value: 'Suomi' },
  { label: 'Kuvauslupa', value: 'Ei' },
  { label: 'Nimi', value: 'Ville Vanhempi' },
  { label: 'Sähköposti', value: 'ville@vanhempi.com' },
  { label: 'Puhelin', value: '0501234567' },
  { label: 'Nimi', value: 'Jopre Jaramand' },
  { label: 'Sähköposti', value: 'jopre@email.com' },
  { label: 'Puhelin', value: '000000000' },
];

const getWrapper = () => {
  return mountWithApolloProvider(
    <MemoryRouter>
      <MembershipDetailsPage />
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

  const labeledValues = wrapper.find('LabeledValue .wrapper');
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
