
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import format from 'date-fns/format';

import PageLayout from '../../../../common/layout/PageLayout';
import ApproveYouthProfileForm from '../approveYouthProfileForm/ApproveYouthProfileForm';
import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');

type Props = {};

function ApproveYouthProfile(props: Props) {
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);
  const convertDateFormat = (value: string | null | undefined) => {
    if (value !== undefined && value !== null){
      return format(new Date(value), 'dd.MM.yyyy').toLocaleString();;
    } else return undefined;
  }
  const convertBooleanToString = (value: boolean | null | undefined) => {
    if (value !== undefined && value !== null) {
      return value.toString();
    }
    return undefined;
  }
  return (
    <PageLayout background="adult">
      <ApproveYouthProfileForm
        profile={{
          firstName: data?.myProfile?.firstName || '',
          lastName: data?.myProfile?.lastName || '',
          address: data?.myProfile?.primaryAddress?.address 
            + ', ' + data?.myProfile?.primaryAddress?.postalCode
            + ', ' + data?.myProfile?.primaryAddress?.city || '',
          email: data?.myProfile?.primaryEmail?.email || '',
          phone:  data?.myProfile?.primaryPhone?.phone || '',
          birthDate: convertDateFormat(data?.myProfile?.youthProfile?.birthDate) || '',
          schoolName: data?.myProfile?.youthProfile?.schoolName || '',
          schoolClass: data?.myProfile?.youthProfile?.schoolClass || '',
          approverFirstName: data?.myProfile?.youthProfile?.approverFirstName || '',
          approverLastName: data?.myProfile?.youthProfile?.approverLastName || '',
          approverPhone: data?.myProfile?.youthProfile?.approverPhone || '',
          approverEmail: data?.myProfile?.youthProfile?.approverEmail || '',
          photoUsageApproved: convertBooleanToString(data?.myProfile?.youthProfile?.photoUsageApproved) || "false",
          languageAtHome: data?.myProfile?.youthProfile?.languageAtHome || '',
        }}
      />
    </PageLayout>
  );
}

export default ApproveYouthProfile;
