import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { loader } from 'graphql.macro';

import convertBooleanToString from '../../helpers/convertBooleantoString';
import convertDateToFi from '../../helpers/convertDateToFi';
import PageLayout from '../../../../common/layout/PageLayout';
import ApproveYouthProfileForm, {
  FormValues,
} from '../approveYouthProfileForm/ApproveYouthProfileForm';
import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';
import {
  ApproveYouthProfile as ApproveYourProfileData,
  ApproveYouthProfileVariables,
} from '../../graphql/__generated__/ApproveYouthProfile';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');
const APPROVE_PROFILE = loader('../../graphql/ApproveYouthProfile.graphql');

type Props = {};
type Params = {
  token: string;
};

function ApproveYouthProfile(props: Props) {
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);

  const params = useParams<Params>();

  const [approveProfile, { loading }] = useMutation<
    ApproveYourProfileData,
    ApproveYouthProfileVariables
  >(APPROVE_PROFILE);

  const handleOnValues = (values: FormValues) => {
    const variables = {
      approvalData: {
        approverFirstName: values.approverFirstName,
        approverLastName: values.approverLastName,
        approverEmail: values.approverEmail,
        approverPhone: values.approverPhone,
        birthDate: data?.myProfile?.youthProfile?.birthDate,
      },
      approvalToken: params.token,
    };

    approveProfile({ variables }).then(result => {
      // Todo add history.push here to redirect user after successful approve
      if (result.data) {
      }
    });
  };

  return (
    <PageLayout background="adult">
      <ApproveYouthProfileForm
        profile={{
          firstName: data?.myProfile?.firstName || '',
          lastName: data?.myProfile?.lastName || '',
          address:
            data?.myProfile?.primaryAddress?.address +
              ', ' +
              data?.myProfile?.primaryAddress?.postalCode +
              ', ' +
              data?.myProfile?.primaryAddress?.city || '',
          email: data?.myProfile?.primaryEmail?.email || '',
          phone: data?.myProfile?.primaryPhone?.phone || '',
          birthDate:
            convertDateToFi(data?.myProfile?.youthProfile?.birthDate) || '',
          schoolName: data?.myProfile?.youthProfile?.schoolName || '',
          schoolClass: data?.myProfile?.youthProfile?.schoolClass || '',
          approverFirstName:
            data?.myProfile?.youthProfile?.approverFirstName || '',
          approverLastName:
            data?.myProfile?.youthProfile?.approverLastName || '',
          approverPhone: data?.myProfile?.youthProfile?.approverPhone || '',
          approverEmail: data?.myProfile?.youthProfile?.approverEmail || '',
          photoUsageApproved:
            convertBooleanToString(
              data?.myProfile?.youthProfile?.photoUsageApproved
            ) || 'false',
          languageAtHome: data?.myProfile?.youthProfile?.languageAtHome || '',
        }}
        isSubmitting={loading}
        onValues={handleOnValues}
      />
    </PageLayout>
  );
}

export default ApproveYouthProfile;
