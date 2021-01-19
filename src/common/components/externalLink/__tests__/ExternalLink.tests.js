import React from 'react';

import { render } from '../../../test/testing-library';
import ExternalLink from '../ExternalLink';

const defaultProps = {
  href: 'https://hel.fi',
  children: 'Helsingin kaupunki',
};
const getWrapper = props =>
  render(<ExternalLink {...defaultProps} {...props} />);

describe('<ExternalLink />', () => {
  it('renders correctly', () => {
    expect(getWrapper().container).toMatchSnapshot();
  });

  it('should warn that it opens in a new window', () => {
    const { getByLabelText } = getWrapper();

    expect(getByLabelText('Aukeaa uuteen ikkunaan')).toBeInTheDocument();
  });
});
