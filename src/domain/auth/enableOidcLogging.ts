import Oidc from 'oidc-client';

function enableOidcLogging() {
  Oidc.Log.logger = console;
}

export default enableOidcLogging;
