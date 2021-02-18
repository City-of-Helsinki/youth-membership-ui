// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickProfileApiToken(obj: Record<string, any>) {
  return obj[process.env.REACT_APP_PROFILE_AUDIENCE as string];
}

export default pickProfileApiToken;
