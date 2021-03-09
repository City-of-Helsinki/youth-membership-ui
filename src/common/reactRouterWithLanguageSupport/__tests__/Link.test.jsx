import React from 'react';

import { render, screen } from '../../test/testing-library';
import Link from '../Link';

const renderLink = (to, lang) => render(<Link to={to} lang={lang} />);

describe('<Link />', () => {
  it('should add current language to link', () => {
    renderLink('/accessibility');

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/fi/accessibility'
    );
  });

  describe('when lang is false', () => {
    it('should not change link', () => {
      renderLink('/accessibility', false);

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        '/accessibility'
      );
    });
  });

  describe('when lang is a language', () => {
    it('should that language to build the link', () => {
      renderLink('/accessibility', 'fr');

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        '/fr/accessibility'
      );
    });
  });
});
