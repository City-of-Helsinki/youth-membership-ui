/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import PageLayout from '../../../../common/layout/PageLayout';
import AcceptYouthProfileForm from '../acceptYouthProfileForm/AcceptYouthProfileForm';
import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');

type Props = {};

function AcceptYouthProfile(props: Props) {
  //const { t } = useTranslation();
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);
  return (
    <PageLayout background="adult">
      <AcceptYouthProfileForm
        profile={{
          //data
          firstName: 'Terhi',
          lastName: 'Ollila',
          address: 'Jokukatu 123, 00100 Helsinki',
          email: 'terhi.ollila@digia.com',
          phone:  '040123456',
        }}
      />
    </PageLayout>
  );
}

export default AcceptYouthProfile;
