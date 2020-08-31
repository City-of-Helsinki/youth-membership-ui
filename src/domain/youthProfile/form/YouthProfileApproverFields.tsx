import React from 'react';
import { useTranslation } from 'react-i18next';

import ArrayFieldTemplate from '../../../common/components/arrayFieldTemplate/ArrayFieldTemplate';
import Stack from '../../../common/components/stack/Stack';
import ageConstants from '../constants/ageConstants';
import YouthProfileFormGrid from './YouthProfileFormGrid';
import TextInput from './FormikTextInput';

type Props = {
  youthAge: number;
};

function YouthProfileApproverFields({ youthAge }: Props) {
  const { t } = useTranslation();

  // For now when using .when() in validation we can't use
  // schema.describe().fields[name].tests to determine if field is required or not.
  // Validation rules returned from .when() won't be added there.
  // For this reason determining asterisk usage must
  // be done with this function
  const approverLabelText = (name: string) => {
    if (youthAge < ageConstants.ADULT) return t(`registration.${name}`) + ' *';
    return t(`registration.${name}`);
  };

  return (
    <Stack space="xl">
      <YouthProfileFormGrid>
        <TextInput
          id="approverFirstName"
          name="approverFirstName"
          labelText={approverLabelText('firstName')}
        />
        <TextInput
          id="approverLastName"
          name="approverLastName"
          labelText={approverLabelText('lastName')}
        />
        <TextInput
          id="approverEmail"
          name="approverEmail"
          type="email"
          labelText={approverLabelText('email')}
        />
        <TextInput
          id="approverPhone"
          name="approverPhone"
          type="tel"
          labelText={approverLabelText('phoneNumber')}
        />
      </YouthProfileFormGrid>
      <ArrayFieldTemplate
        name="additionalContactPersons"
        renderField={(value, index, arrayPath) => (
          <YouthProfileFormGrid>
            <TextInput
              id={`${arrayPath}.firstName`}
              name={`${arrayPath}.firstName`}
              labelText={approverLabelText('firstName')}
            />
            <TextInput
              id={`${arrayPath}.lastName`}
              name={`${arrayPath}.lastName`}
              labelText={approverLabelText('lastName')}
            />
            <TextInput
              id={`${arrayPath}.email`}
              name={`${arrayPath}.email`}
              type="email"
              labelText={approverLabelText('email')}
            />
            <TextInput
              id={`${arrayPath}.phone`}
              name={`${arrayPath}.phone`}
              type="tel"
              labelText={approverLabelText('phoneNumber')}
            />
          </YouthProfileFormGrid>
        )}
        addItemLabel={t('registration.addGuardian')}
        onPushItem={push =>
          push({
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
          })
        }
      />
    </Stack>
  );
}

export default YouthProfileApproverFields;
