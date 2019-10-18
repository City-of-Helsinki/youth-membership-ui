import { combineReducers } from 'redux-starter-kit';
import { reducer as oidcReducer } from 'redux-oidc';

const rootReducer = combineReducers({
  oidc: oidcReducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
