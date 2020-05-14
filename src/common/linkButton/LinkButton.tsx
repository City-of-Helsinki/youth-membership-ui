import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import '../../../node_modules/hds-core/lib/components/button/button.css';

type Props = {
  path: string;
  target?: string;
  component: 'a' | 'Link';
  buttonText: string;
  variant: 'primary' | 'secondary' | 'supplementary';
  rel?: string;
  className?: string;
};

function LinkButton({
  className,
  path,
  target,
  buttonText,
  component,
  variant,
  rel,
}: Props) {
  if (component === 'Link') {
    return (
      <Link
        to={path}
        className={classNames(`hds-button hds-button--${variant}`, className)}
      >
        <span className="hds-button__label">{buttonText}</span>
      </Link>
    );
  }

  return (
    <a
      href={path}
      className={classNames(`hds-button hds-button--${variant}`, className)}
      target={target || ''}
      rel={rel}
    >
      <span className='hds-button__label'>{buttonText}</span>
    </a>
  );
}
export default LinkButton;
