import React, { ReactNode } from 'react';

import styles from './stack.module.css';

export type Space =
  | '4-xs'
  | '3-xs'
  | '2-xs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '2-xl'
  | '3-xl'
  | '4-xl';
type CssFriendlySpace =
  | 'xs-4'
  | 'xs-3'
  | 'xs-2'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xl-2'
  | 'xl-3'
  | 'xl-4';

function transformToCssFriendly(space: Space): CssFriendlySpace {
  switch (space) {
    case '4-xs':
    case '3-xs':
    case '2-xs':
    case '2-xl':
    case '3-xl':
    case '4-xl':
      return space
        .split('-')
        .reverse()
        .join('-') as CssFriendlySpace;
    default:
      return space;
  }
}

type Props = {
  children: ReactNode;
  component?: 'div' | 'ol' | 'ul';
  space?:
    | '4-xs'
    | '3-xs'
    | '2-xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2-xl'
    | '3-xl'
    | '4-xl';
};

function Stack({ component = 'div', children, space = 'm' }: Props) {
  const cssFriendlySpace = transformToCssFriendly(space);

  return React.createElement(
    component,
    { className: [styles.stack, styles[cssFriendlySpace]].join(' ') },
    children
  );
}

export default Stack;
