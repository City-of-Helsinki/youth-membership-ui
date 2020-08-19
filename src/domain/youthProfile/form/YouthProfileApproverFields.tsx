import React from 'react';
import { useTranslation } from 'react-i18next';

import ArrayFieldTemplate from '../../../common/components/arrayFieldTemplate/ArrayFieldTemplate';
import Stack from '../../../common/components/stack/Stack';
import YouthProfileFormGrid from './YouthProfileFormGrid';
import TextInput from './FormikTextInput';

interface Props {
  approverLabelText: (name: string) => string;
}

function YouthProfileApproverFields({ approverLabelText }: Props) {
  const { t } = useTranslation();

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
