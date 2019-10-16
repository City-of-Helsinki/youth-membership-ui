import {
  configureStore,
  getDefaultMiddleware,
  Store,
  ConfigureStoreOptions,
} from 'redux-starter-kit';
import { USER_FOUND } from 'redux-oidc';

import rootReducer from './rootReducer';

const isProd = process.env.NODE_ENV === 'production';

export function configureAppStore(
  options: Partial<ConfigureStoreOptions>
): Store {
  const store = configureStore({
    reducer: rootReducer,
    ...options,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (!isProd && (module as any).hot) {
    (module as any).hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return store;
}

const store = configureAppStore({
  devTools: !isProd,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [USER_FOUND],
    },
  }),
});

export default store;
