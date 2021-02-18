import React from 'react';
import { render } from '@testing-library/react';

import AccessibilityStatement from '../AccessibilityStatement';
import i18n from '../../../common/test/testi18nInit';

test('matches snapshot', () => {
  const wrapper = render(<AccessibilityStatement />);
  expect(wrapper.container).toMatchSnapshot();
});

describe('renders correct component based on language', () => {
  test('language is finnish', () => {
    const { getByText } = render(<AccessibilityStatement />);

    expect(getByText('Saavutettavuusseloste')).toBeInTheDocument();
  });

  test('language is english', () => {
    i18n.changeLanguage('en');
    const { getByText } = render(<AccessibilityStatement />);

    expect(getByText('Accessibility Statement')).toBeInTheDocument();
  });

  test('language is swedish', () => {
    i18n.changeLanguage('sv');
    const { getByText } = render(<AccessibilityStatement />);

    expect(getByText('Tillgänglighetsutlåtande')).toBeInTheDocument();
  });

  test('language is something random', () => {
    i18n.changeLanguage('asd');
    const { getByText } = render(<AccessibilityStatement />);

    expect(getByText('Invalid language.')).toBeInTheDocument();
  });
});
