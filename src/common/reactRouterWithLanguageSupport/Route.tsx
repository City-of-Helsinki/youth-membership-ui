import React, { useEffect } from 'react';
import {
  Route as RRRoute,
  RouteProps,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import I18nService from '../../i18n/I18nService';
import * as PathUtils from './pathUtils';

type Params = {
  language?: string;
};

// Redirects the user into the language aware url of the view in case
// they try to access a language unaware url. The language is either
// the default language, or the language the user has selected earlier
// or during an earlier visit.
function useRedirectToDefaultLanguage(disable?: boolean) {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<Params>('/:language');

  const languageParam = match?.params.language;
  const isMissingLanguage = !Boolean(languageParam);
  const isMissingSupportedLanguage =
    languageParam && !I18nService.languages.includes(languageParam);

  // If there's no language in the path, add one
  useEffect(() => {
    if (!disable && isMissingLanguage) {
      history.replace(
        PathUtils.getPathnameWithLanguage(
          location.pathname,
          I18nService.language
        )
      );
    }
  }, [isMissingLanguage, history, location.pathname, disable]);

  // If there's a non-supported language in the path, replace it
  useEffect(() => {
    if (!disable && isMissingSupportedLanguage) {
      history.replace(
        PathUtils.replaceLanguageInPath(location.pathname, I18nService.language)
      );
    }
  }, [isMissingSupportedLanguage, history, location.pathname, disable]);
}

export type Props = RouteProps & {
  isLanguageAgnostic?: boolean;
};

function Route({ path, isLanguageAgnostic = false, ...rest }: Props) {
  useRedirectToDefaultLanguage(isLanguageAgnostic);

  const pathWithLanguageSupport = isLanguageAgnostic
    ? path
    : PathUtils.getPathWithLanguage(path);

  return <RRRoute {...rest} path={pathWithLanguageSupport} />;
}

export default Route;
