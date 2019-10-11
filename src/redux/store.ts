import {
  configureStore,
  Store,
  ConfigureStoreOptions,
} from 'redux-starter-kit';

import rootReducer from './rootReducer';

export default function configureAppStore(
  options: Partial<ConfigureStoreOptions>
): Store {
  const store = configureStore({
    reducer: rootReducer,
    ...options,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return store;
}
