import React from 'react';

import i18n from '../../../test/testi18nInit';
import { render } from '../../../test/testing-library';
import HelsinkiLogo from '../HelsinkiLogo';

type Props = {
  isLinkToFrontPage?: boolean;
};

const getWrapper = (props?: Props) => {
  return render(<HelsinkiLogo {...props} />);
};

afterEach(() => {
  i18n.changeLanguage('fi');
});

describe('renders correct logo based on language', () => {
  test('finnish logo', () => {
    const { getByLabelText } = getWrapper();

    expect(getByLabelText('Helsinki-logo')).toBeInTheDocument();
  });

  test('swedish logo', () => {
    i18n.changeLanguage('sv');
    const { getByLabelText } = getWrapper();

    expect(getByLabelText('Helsingfors logotyp')).toBeInTheDocument();
  });
});

test('renders link', () => {
  const { getByRole } = getWrapper({ isLinkToFrontPage: true });

  expect(getByRole('link', { name: 'Helsinki-logo' })).toBeInTheDocument();
});

test('renders span', () => {
  const { getByLabelText } = getWrapper();

  expect(getByLabelText('Helsinki-logo')).toBeInTheDocument();
});
