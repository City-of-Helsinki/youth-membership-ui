const url = `${process.env.REACT_APP_OIDC_AUTHORITY}api-tokens/`;

async function fetchApiTokens(accessToken: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
}

export default fetchApiTokens;
