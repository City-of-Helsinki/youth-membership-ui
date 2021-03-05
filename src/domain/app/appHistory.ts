import * as H from 'history';

import * as PathUtils from '../../common/reactRouterWithLanguageSupport/pathUtils';
import I18nService, { Language } from '../../i18n/I18nService';

function getPathname<S>(
  pathOrLocation: H.Path | H.LocationDescriptorObject<S>
): string | undefined {
  if (typeof pathOrLocation === 'string') {
    return pathOrLocation;
  }

  return pathOrLocation.pathname;
}

function extendBrowserHistoryWithLanguageAwareness(browserHistory: H.History) {
  const push = <S>(
    pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
    state?: S,
    language: false | Language = I18nService.language
  ) => {
    const pathname = getPathname(pathOrLocation);
    const isLanguageInPath = PathUtils.getIsLanguageInPath(pathname);

    if (
      (typeof language === 'boolean' && language === false) ||
      isLanguageInPath
    ) {
      if (typeof pathOrLocation === 'string') {
        return browserHistory.push(pathOrLocation, state);
      }

      return browserHistory.push(pathOrLocation);
    }

    if (typeof pathOrLocation === 'string') {
      return browserHistory.push(
        PathUtils.getPathnameWithLanguage(pathOrLocation, language),
        state
      );
    }

    browserHistory.push(
      PathUtils.getLocationWithLanguage(pathOrLocation, language)
    );
  };

  const replace = <S>(
    pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
    state?: S,
    language: false | Language = I18nService.language
  ) => {
    const pathname = getPathname(pathOrLocation);
    const isLanguageInPath = PathUtils.getIsLanguageInPath(pathname);

    if (
      (typeof language === 'boolean' && language === false) ||
      isLanguageInPath
    ) {
      if (typeof pathOrLocation === 'string') {
        return browserHistory.replace(pathOrLocation, state);
      }

      return browserHistory.replace(pathOrLocation);
    }

    if (typeof pathOrLocation === 'string') {
      return browserHistory.replace(
        PathUtils.getPathnameWithLanguage(pathOrLocation, I18nService.language),
        state
      );
    }

    browserHistory.replace(
      PathUtils.getLocationWithLanguage(pathOrLocation, I18nService.language)
    );
  };

  return {
    ...browserHistory,
    push,
    replace,
  };
}

const history = extendBrowserHistoryWithLanguageAwareness(
  H.createBrowserHistory()
);

export default history;
