import React from 'react';
import { Redirect as RRRedirect, RedirectProps } from 'react-router-dom';

import I18nService, { Language } from '../../i18n/I18nService';
import * as PathUtils from './pathUtils';

export function getToWithLanguage(to: RedirectProps['to'], lang: Language) {
  if (typeof to === 'string') {
    return PathUtils.getPathnameWithLanguage(to, lang);
  }

  return PathUtils.getLocationWithLanguage(to, lang);
}

type Props = RedirectProps & {
  lang?: false | Language;
};

function Redirect({ to, lang = I18nService.language, ...rest }: Props) {
  // Allow the language interpolation to be ignored in case the language
  // is already available in the url or if it's not needed.
  const injectedTo =
    typeof lang === 'boolean' && lang === false
      ? to
      : getToWithLanguage(to, lang);

  return <RRRedirect {...rest} to={injectedTo} />;
}

export default Redirect;
