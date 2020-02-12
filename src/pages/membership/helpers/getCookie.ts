export default function getCookie(cookieName: string) {
  const pattern = RegExp(cookieName + '=.[^;]*');
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return '';
}
