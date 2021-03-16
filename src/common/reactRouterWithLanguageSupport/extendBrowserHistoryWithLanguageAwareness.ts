import * as H from 'history';

import * as PathUtils from './pathUtils';
import I18nService, { Language } from '../../i18n/I18nService';

function getPathname<S>(
  pathOrLocation: H.Path | H.LocationDescriptorObject<S>
): string | undefined {
  if (typeof pathOrLocation === 'string') {
    return pathOrLocation;
  }

  return pathOrLocation.pathname;
}

function getPathnameWithLanguage<S>(
  pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
  language: Language
) {
  if (typeof pathOrLocation === 'string') {
    return PathUtils.getPathnameWithLanguage(pathOrLocation, language);
  }

  return PathUtils.getLocationWithLanguage(pathOrLocation, language);
}

interface HistoryFunction<S> {
  historyFunction(path: H.Path, state?: S): void;
  historyFunction(location: H.LocationDescriptorObject<S>): void;
}

function evokeHistoryFunction<S>(
  historyFunction: HistoryFunction<S>['historyFunction'],
  pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
  state?: S
) {
  if (typeof pathOrLocation === 'string') {
    if (state) {
      historyFunction(pathOrLocation, state);
    } else {
      historyFunction(pathOrLocation);
    }
  } else {
    historyFunction(pathOrLocation);
  }
}

function extendWithLanguageAwareness<S>(
  historyFunction: HistoryFunction<S>['historyFunction']
) {
  return function(
    pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
    state?: S,
    language: false | Language = I18nService.language
  ) {
    const pathname = getPathname(pathOrLocation);
    const isLanguageInPath = PathUtils.getIsLanguageInPath(pathname);

    if (typeof language === 'string' && !isLanguageInPath) {
      const pathOrLocationWithLanguage = getPathnameWithLanguage<S>(
        pathOrLocation,
        language
      );

      evokeHistoryFunction<S>(
        historyFunction,
        pathOrLocationWithLanguage,
        state
      );
    } else {
      evokeHistoryFunction<S>(historyFunction, pathOrLocation, state);
    }
  };
}

function extendBrowserHistoryWithLanguageAwareness(browserHistory: H.History) {
  return {
    ...browserHistory,
    push: extendWithLanguageAwareness(browserHistory.push),
    replace: extendWithLanguageAwareness(browserHistory.replace),
  };
}

export default extendBrowserHistoryWithLanguageAwareness;
