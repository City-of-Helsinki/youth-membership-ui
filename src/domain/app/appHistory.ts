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

interface HistoryFunction<S> {
  historyFunction(path: H.Path, state?: S, language?: Language): void;
  historyFunction(
    location: H.LocationDescriptorObject<S>,
    language?: Language
  ): void;
}

function evokeHistoryFunction<S>(
  historyFunction: HistoryFunction<S>['historyFunction'],
  pathOrLocation: H.Path | H.LocationDescriptorObject<S>,
  state?: S,
  language?: Language
) {
  if (typeof pathOrLocation === 'string') {
    historyFunction(pathOrLocation, state, language);
  } else {
    historyFunction(pathOrLocation, language);
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
      evokeHistoryFunction<S>(historyFunction, pathOrLocation, state, language);
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

const history = extendBrowserHistoryWithLanguageAwareness(
  H.createBrowserHistory()
);

export default history;
