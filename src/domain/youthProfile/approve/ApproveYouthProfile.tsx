import React from 'react';
import { useTranslation } from 'react-i18next';

import { YouthProfileByApprovalToken } from '../../../graphql/generatedTypes';
import convertBooleanToString from '../../../common/helpers/convertBooleanToString';
import PageSection from '../../../common/components/layout/PageSection';
import getAddress from '../../membership/helpers/getAddress';
import getAddresses from '../../membership/helpers/getAddresses';
import ConfirmApprovingYouthProfile from './ConfirmApprovingYouthProfile';
import ApproveYouthProfileForm, { FormValues } from './ApproveYouthProfileForm';

type Props = {
  isApprovalSuccessful?: boolean;
  data: YouthProfileByApprovalToken;
  onSubmit: (values: FormValues) => Promise<unknown>;
};
type Params = {
  token: string;
};

function ApproveYouthProfile({ isApprovalSuccessful, data, onSubmit }: Props) {
  const { i18n } = useTranslation();

  return (
    <PageSection>
      {!isApprovalSuccessful && (
        <ApproveYouthProfileForm
          profile={{
            firstName:
              data?.youthProfileByApprovalToken?.profile?.firstName || '',
            lastName:
              data?.youthProfileByApprovalToken?.profile?.lastName || '',
            address: getAddress(data, i18n.languages[0]),
            addresses: getAddresses(data, i18n.languages[0]),
            email:
              data?.youthProfileByApprovalToken?.profile?.primaryEmail?.email ||
              '',
            phone:
              data?.youthProfileByApprovalToken?.profile?.primaryPhone?.phone ||
              '',
            birthDate: data?.youthProfileByApprovalToken?.birthDate,
            schoolName: data?.youthProfileByApprovalToken?.schoolName || '',
            schoolClass: data?.youthProfileByApprovalToken?.schoolClass || '',
            approverFirstName:
              data?.youthProfileByApprovalToken?.approverFirstName || '',
            approverLastName:
              data?.youthProfileByApprovalToken?.approverLastName || '',
            approverPhone:
              data?.youthProfileByApprovalToken?.approverPhone || '',
            approverEmail:
              data?.youthProfileByApprovalToken?.approverEmail || '',
            photoUsageApproved: convertBooleanToString(
              data?.youthProfileByApprovalToken?.photoUsageApproved
            ),
            languageAtHome:
              data?.youthProfileByApprovalToken?.languageAtHome || '',
          }}
          // isSubmitting={loading}
          onSubmit={onSubmit}
        />
      )}
      {isApprovalSuccessful && <ConfirmApprovingYouthProfile />}
    </PageSection>
  );
}

export default ApproveYouthProfile;
