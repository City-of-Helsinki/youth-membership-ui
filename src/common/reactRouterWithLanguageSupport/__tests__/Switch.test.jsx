import React from 'react';
import { Route } from 'react-router';

import { render, screen } from '../../test/testing-library';
import Switch from '../Switch';

const renderTestCase = (initialEntries = []) =>
  render(
    <Switch>
      <Route
        exact
        path="/accessibility"
        render={() => <span data-testid="accessibility" />}
      />
      <Route
        exact
        isLanguageAgnostic
        path="/callback"
        render={() => <span data-testid="callback" />}
      />
    </Switch>,
    null,
    {
      routerOptions: {
        initialEntries,
      },
    }
  );

describe('<Switch />', () => {
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
      renderTestCase(['/en/callback']);

      expect(screen.queryByTestId('callback')).not.toBeInTheDocument();
    });

    it('should work with the original path', () => {
      renderTestCase(['/callback']);

      expect(screen.getByTestId('callback')).toBeInTheDocument();
    });
  });
});
