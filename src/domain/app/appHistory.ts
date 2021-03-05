import * as H from 'history';

// eslint-disable-next-line max-len
import extendBrowserHistoryWithLanguageAwareness from '../../common/reactRouterWithLanguageSupport/extendBrowserHistoryWithLanguageAwareness';

const history = extendBrowserHistoryWithLanguageAwareness(
  H.createBrowserHistory()
);

export default history;
