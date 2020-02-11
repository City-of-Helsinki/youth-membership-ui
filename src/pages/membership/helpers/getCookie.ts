export default function getCookie(cookieName: string) {
  const pattern = RegExp(cookieName + "=.[^;]*");
  let matched = document.cookie.match(pattern);
  if(matched){
    let cookie = matched[0].split('=');
    return cookie[1]
  }
  return ''
}
