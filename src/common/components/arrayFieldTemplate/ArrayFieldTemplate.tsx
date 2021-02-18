import React, { ReactNode } from 'react';
import { FieldArray, useField, FieldArrayRenderProps } from 'formik';
import { Button, IconPlusCircle } from 'hds-react';
import { useTranslation } from 'react-i18next';

import Stack, { Space } from '../stack/Stack';
import styles from './arrayFieldTemplate.module.css';

type Props = {
  name: string;
  renderField: (value: unknown, index: number, arrayPath: string) => ReactNode;
  addItemLabel: string;
  removeItemLabel?: string;
  onPushItem: (push: (value: unknown) => void) => unknown;
  space?: Space;
  listSpace?: Space;
};

function ArrayFieldTemplate({
  name,
  renderField,
  addItemLabel,
  removeItemLabel,
  onPushItem,
  space = 'm',
  listSpace = 'l',
}: Props) {
  const { t } = useTranslation();
  const [{ value: values }] = useField(name);

  const removeItemLabelWithDefault =
    removeItemLabel || t('registration.remove');

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack space={space}>
          {Object.keys(values).length > 0 && (
            <Stack space={listSpace}>
              {((values as unknown) as Array<unknown>).map(
                (value, index: number) => (
                  <div key={index}>
                    {renderField(value, index, `${name}.${index}`)}
                    <button
                      type="button"
                      className={styles.additionalActionButton}
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      {removeItemLabelWithDefault}
                    </button>
                  </div>
                )
              )}
            </Stack>
          )}
          <Button
            type="button"
            iconLeft={<IconPlusCircle />}
            variant="supplementary"
            className={styles.addItemButton}
            onClick={() => {
              onPushItem(arrayHelpers.push);
            }}
          >
            {addItemLabel}
          </Button>
        </Stack>
      )}
    />
  );
}

export default ArrayFieldTemplate;
