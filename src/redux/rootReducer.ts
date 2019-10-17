import { combineReducers } from 'redux-starter-kit';
import { reducer as oidcReducer } from 'redux-oidc';

export default combineReducers({
  oidc: oidcReducer,
});
