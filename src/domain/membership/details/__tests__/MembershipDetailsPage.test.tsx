import React from 'react';
import { loader } from 'graphql.macro';

import { membershipDetailsData } from '../../../../common/test/membershipDetailsData';
import {
  render,
  screen,
  waitFor,
} from '../../../../common/test/testing-library';
import MembershipDetailsPage from '../MembershipDetailsPage';

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
  { label: 'Ensisijainen asiointikieli', value: 'Suomi' },
  { label: 'Osoite', value: 'Testikatu 55, 12345, Helsinki, Suomi' },
  { label: 'Osoite 2', value: 'Testikatu 66, 00100, Helsinki, Suomi' },
  { label: 'Koulu', value: 'School, Class' },
  { label: 'Ensisijainen yhteydenottokieli', value: 'Suomi' },
  { label: 'Kuvauslupa', value: 'Ei' },
  { label: 'Nimi', value: 'Ville Vanhempi' },
  { label: 'Sähköposti', value: 'ville@vanhempi.com' },
  { label: 'Puhelin', value: '0501234567' },
  { label: 'Nimi', value: 'Jopre Jaramand' },
  { label: 'Sähköposti', value: 'jopre@email.com' },
  { label: 'Puhelin', value: '000000000' },
];

const getWrapper = () => {
  return render(<MembershipDetailsPage />, mocks);
};

test('all data is present', async () => {
  getWrapper();

  await waitFor(() => screen.getByText('Omat tiedot'));

  expectedValues.forEach(({ label, value }) => {
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    expect(screen.getAllByText(value)[0]).toBeInTheDocument();
  });
});
