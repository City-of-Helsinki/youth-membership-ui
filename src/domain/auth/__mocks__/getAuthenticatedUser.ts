const getAuthenticatedUser = () =>
  Promise.resolve({ access_token: 'foo.bar.baz' });

export default getAuthenticatedUser;
