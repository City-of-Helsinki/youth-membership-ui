export default function getCookie(cookieName: string) {
  const name = cookieName + '=';
  const decodeCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodeCookie.split(';');

  for (let i = 0; i < cookieArray.length; i = i + 1) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}
