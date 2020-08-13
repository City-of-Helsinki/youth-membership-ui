export default {
  URLS: {
    YOUTH_CENTERS: 'https://palvelukartta.hel.fi/fi/search?q=nuorisotalo',
  },
  OIDC_KEY: `oidc.user:${process.env.REACT_APP_OIDC_AUTHORITY}:${process.env.REACT_APP_OIDC_CLIENT_ID}`,
};