import React from 'react';
import { subYears, format } from 'date-fns';

import { render, screen } from '../../../../common/test/testing-library';
import MembershipInformation from '../MembershipInformation';
import { MembershipStatus } from '../../../../graphql/generatedTypes';

function getMinorBirthday() {
  // 15 years today
  const birthday = subYears(new Date(), 15);

  return format(birthday, 'yyyy-MM-dd');
}

function validateView({
  title,
  description,
  mainButtonLabel,
  secondaryButtonLabel,
}) {
  expect(screen.getByText(title)).toBeInTheDocument();

  if (description) {
    expect(screen.getByText(description)).toBeInTheDocument();
  }

  if (mainButtonLabel) {
    expect(
      screen.getByRole('button', { name: mainButtonLabel })
    ).toBeInTheDocument();
  }

  if (secondaryButtonLabel) {
    expect(
      screen.getByRole('link', { name: secondaryButtonLabel })
    ).toBeInTheDocument();
  }
}

const renderComponent = props => {
  const injectedProps = {
    ...props,
    youthProfile: {
      ...props.youthProfile,
      approverEmail: 'test@hel.fi',
      expiration: '2020-10-10',
    },
  };

  return render(<MembershipInformation {...injectedProps} />);
};

describe('<MembershipInformation />', () => {
  describe('when minor', () => {
    const renderMinor = (props = {}) => {
      const injectedProps = {
        ...props,
        youthProfile: {
          ...props.youthProfile,
          birthDate: getMinorBirthday(),
        },
      };

      return renderComponent(injectedProps);
    };

    it('ACTIVE, renewable', () => {
      renderMinor({
        youthProfile: {
          membershipStatus: MembershipStatus.ACTIVE,
          renewable: true,
        },
        profile: {},
      });

      validateView({
        title: /Jäsenyysaika umpeutuu .*/,
        description: 'Lähetä jäsenyys uudelleen hyväksyttäväksi huoltajallesi.',
        mainButtonLabel: 'Lähetä uusimispyyntö huoltajalle',
        secondaryButtonLabel: 'Näytä profiilin tiedot',
      });
    });

    it('RENEWING', () => {
      renderMinor({
        youthProfile: {
          membershipStatus: MembershipStatus.RENEWING,
        },
        profile: {},
      });

      validateView({
        title: /Jäsenyysaika umpeutuu .*. Uusiminen odottaa huoltajan hyväksyntää./,
        description: /Pyyntö jäsenyyden uusimisesta on lähetetty osoitteeseen .*/,
        mainButtonLabel: 'Lähetä uusi pyyntö huoltajalle',
        secondaryButtonLabel: 'Näytä profiilin tiedot',
      });
    });

    it('EXPIRED', () => {
      renderMinor({
        youthProfile: {
          membershipStatus: MembershipStatus.EXPIRED,
        },
        profile: {},
      });

      validateView({
        title: 'Jäsenyysaika on umpeutunut.',
        description: 'Lähetä jäsenyys uudelleen hyväksyttäväksi huoltajallesi.',
        mainButtonLabel: 'Lähetä uusimispyyntö huoltajalle',
      });
    });

    it('PENDING', () => {
      renderMinor({
        youthProfile: {
          membershipStatus: MembershipStatus.PENDING,
        },
        profile: {},
      });

      validateView({
        title: 'Jäsenyyden uusiminen odottaa huoltajan hyväksyntää.',
        description: /Pyyntö jäsenyyden uusimisesta on lähetetty osoitteeseen .*/,
        mainButtonLabel: 'Lähetä uusi pyyntö huoltajalle',
      });
    });
  });

  describe('when adult', () => {
    const renderAdult = (props = {}) => renderComponent(props);

    it('ACTIVE, renewable', () => {
      renderAdult({
        youthProfile: {
          renewable: true,
          membershipStatus: MembershipStatus.ACTIVE,
        },
        profile: {},
      });

      validateView({
        title: /Jäsenyysaika umpeutuu .*/,
        mainButtonLabel: 'Uusi jäsenyys',
      });
    });

    it('EXPIRED', () => {
      renderAdult({
        youthProfile: {
          membershipStatus: MembershipStatus.EXPIRED,
        },
        profile: {},
      });

      validateView({
        title: 'Jäsenyysaika on umpeutunut.',
        mainButtonLabel: 'Uusi jäsenyys',
      });
    });
  });
});
