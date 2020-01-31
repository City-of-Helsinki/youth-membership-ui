import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from '../../../../common/button/Button';
import NotificationComponent from '../../../../common/notification/NotificationComponent';
import styles from './SentYouthProfile.module.css';
import {
  ApproverEmail,
  UpdateMyYouthProfile as UpdateMyYouthProfileData,
  UpdateMyYouthProfileVariables,
} from '../../../../graphql/generatedTypes';

const APPROVER_EMAIL = loader('../../graphql/ApproverEmail.graphql');
const RESEND_EMAIL = loader('../../graphql/UpdateMyYouthProfile.graphql');

type Props = {};

function ViewYouthProfile(props: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const [emailReSent, setEmailReSent] = useState(false);
  const { data } = useQuery<ApproverEmail>(APPROVER_EMAIL, {
    onError: () => setShowNotification(true),
  });
  const { t } = useTranslation();

  const [resendConfirmationEmail] = useMutation<
    UpdateMyYouthProfileData,
    UpdateMyYouthProfileVariables
  >(RESEND_EMAIL);

  const handleEmailResent = () => {
    const variables: UpdateMyYouthProfileVariables = {
      input: {
        youthProfile: {
          resendRequestNotification: true,
        },
      },
    };
    resendConfirmationEmail({ variables })
      .then(result => {
        if (result.data) {
          setEmailReSent(true);
        }
      })
      .catch(() => setShowNotification(true));
  };

  return (
    <div className={styles.hostingBox}>
      <h1>{t('confirmSendingProfile.title')}</h1>

      <p className={styles.helpText}>
        {emailReSent
          ? t('confirmSendingProfile.sendAgainHelpText')
          : t('confirmSendingProfile.helpText')}
        {data?.youthProfile?.approverEmail}.
      </p>
      <Button
        type="button"
        className={styles.button}
        onClick={handleEmailResent}
        disabled={emailReSent}
      >
        {t('confirmSendingProfile.buttonText')}
      </Button>
      <p>
        <Link to="/membership-details">
          {t('confirmSendingProfile.linkToShowSentData')}
          <span className={styles.linkArrow}> ></span>
        </Link>
      </p>

      <NotificationComponent
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

export default ViewYouthProfile;
