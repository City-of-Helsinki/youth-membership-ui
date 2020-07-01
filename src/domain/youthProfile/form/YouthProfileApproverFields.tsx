import React from 'react';

import TextInput from './FormikTextInput';
import styles from './youthProfileForm.module.css';

interface Props {
  approverLabelText: (name: string) => string;
}

function YouthProfileApproverFields({ approverLabelText }: Props) {
  return (
    <>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="approverFirstName"
          name="approverFirstName"
          labelText={approverLabelText('firstName')}
        />
        <TextInput
          className={styles.formInput}
          id="approverLastName"
          name="approverLastName"
          labelText={approverLabelText('lastName')}
        />
      </div>
      <div className={styles.formRow}>
        <TextInput
          className={styles.formInput}
          id="approverEmail"
          name="approverEmail"
          type="email"
          labelText={approverLabelText('email')}
        />
        <TextInput
          className={styles.formInput}
          id="approverPhone"
          name="approverPhone"
          type="tel"
          labelText={approverLabelText('phoneNumber')}
        />
      </div>
    </>
  );
}

export default YouthProfileApproverFields;
