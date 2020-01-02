/* eslint-disable */

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import PageLayout from '../../../../common/layout/PageLayout';
import AcceptYouthProfileForm from '../acceptYouthProfileForm/AcceptYouthProfileForm';
import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');

type Props = {};

function AcceptYouthProfile(props: Props) {
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);
  return (
    <PageLayout background="adult">
      <AcceptYouthProfileForm
        profile={{
          firstName: data?.myProfile?.firstName || '',
          lastName: data?.myProfile?.lastName || '',
          address: data?.myProfile?.primaryAddress?.address 
            + ', ' + data?.myProfile?.primaryAddress?.postalCode
            + ', ' + data?.myProfile?.primaryAddress?.city || '',
          email: data?.myProfile?.primaryEmail?.email || '',
          phone:  data?.myProfile?.primaryPhone?.phone || '',
          birthDate: data?.myProfile?.youthProfile?.birthDate || '',
          schoolName: data?.myProfile?.youthProfile?.schoolName || '',
          schoolClass: data?.myProfile?.youthProfile?.schoolClass || '',
          approverFirstName: data?.myProfile?.youthProfile?.approverFirstName || '',
          approverLastName: data?.myProfile?.youthProfile?.approverLastName || '',
          approverPhone: data?.myProfile?.youthProfile?.approverPhone || '',
          approverEmail: data?.myProfile?.youthProfile?.approverEmail || '',
          photoUsageApproved: data?.myProfile?.youthProfile?.photoUsageApproved || false,
          languageAtHome: data?.myProfile?.youthProfile?.languageAtHome || '',
        }}
      />
    </PageLayout>
  );
}

export default AcceptYouthProfile;
