import React from 'react';

import { render, screen } from '../../test/testing-library';
import Route from '../Route';

const renderTestCase = (initialEntries = [], isLanguageAgnostic = false) => {
  return render(
    <Route
      isLanguageAgnostic={isLanguageAgnostic}
      exact
      path="/accessibility"
      render={() => {
        return <span data-testid="accessibility" />;
      }}
    />,
    null,
    {
      routerOptions: {
        initialEntries,
      },
    }
  );
};

describe('<Route />', () => {
  it("should extend it's child routes' props with a language aware path", () => {
    renderTestCase(['/en/accessibility']);

    expect(screen.getByTestId('accessibility')).toBeInTheDocument();
  });

  it('should work with the original path', () => {
    renderTestCase(['/accessibility']);

    expect(screen.getByTestId('accessibility')).toBeInTheDocument();
  });

  describe('when child has isLanguageAgnostic toggled on', () => {
    it('should ignore the route', () => {
      renderTestCase(['/en/accessibility'], true);

      expect(screen.queryByTestId('callback')).not.toBeInTheDocument();
    });

    it('should work with the original path', () => {
      renderTestCase(['/accessibility'], true);

      expect(screen.getByTestId('accessibility')).toBeInTheDocument();
    });
  });

  // I could not find a way to test the following features

  describe.skip('when language is missing', () => {
    it('should add it', () => {
      // skip
    });
  });

  describe.skip('when language is unsupported', () => {
    it('should switch it', () => {
      // skip
    });
  });
});
