// import router from '@/router'

export function toLogin() {
  const { protocol, host, pathname, hostname, search } = location
  const href = `${protocol}//${host}${pathname}`
  location.href = `http://${hostname}:5100/#/?redirect_uri=${href}${search}&type=organ`
}
