import React from 'react';
import { useTranslation } from 'react-i18next';

import convertBooleanToString from '../../../common/helpers/convertBooleanToString';
import PageSection from '../../../common/components/layout/PageSection';
import getAddress from '../../membership/helpers/getAddress';
import getAddresses from '../../membership/helpers/getAddresses';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';
import ConfirmApprovingYouthProfile from './ConfirmApprovingYouthProfile';
import ApproveYouthProfileForm, { FormValues } from './ApproveYouthProfileForm';
import { MergedProfile } from './useProfileByTokens';

type Props = {
  isApprovalSuccessful?: boolean;
  data: MergedProfile;
  onSubmit: (values: FormValues) => Promise<unknown>;
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
            address: getAddress(
              data?.youthProfileByApprovalToken?.profile,
              i18n.languages[0]
            ),
            addresses: getAddresses(
              data?.youthProfileByApprovalToken?.profile,
              i18n.languages[0]
            ),
            email:
              data?.youthProfileByApprovalToken?.profile?.primaryEmail?.email ||
              '',
            phone:
              data?.youthProfileByApprovalToken?.profile?.primaryPhone?.phone ||
              '',
            language:
              data?.youthProfileByApprovalToken?.profile?.language || '',
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
            additionalContactPersons: getAdditionalContactPersons(
              data?.youthProfileByApprovalToken
            ),
          }}
          onSubmit={onSubmit}
        />
      )}
      {isApprovalSuccessful && <ConfirmApprovingYouthProfile />}
    </PageSection>
  );
}

export default ApproveYouthProfile;
