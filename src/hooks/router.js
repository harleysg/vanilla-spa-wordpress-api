import { ROUTES } from "../constants/index.js";

const PREV_ROUTE = {name: ''}

export async function Router() {
  const { hash } = window.location
  const _HASH = hash.split('#')[1] || ''
  const _ROUTE = Object.entries(ROUTES).find(
    ([, path]) => path.regex.test(`${_HASH}`.trim())
  );

  _catchRoute(_ROUTE[0])
}

export async function LinkEvent(event) {
  const { target } = event
  const routerLinks = document.querySelectorAll('[sg-route]')

  if (routerLinks.length) {
    const ROUTER_VALUE = target.attributes.getNamedItem('sg-route')

    if (ROUTER_VALUE) {
      _catchRoute(ROUTER_VALUE.value)
    }
    
  }
}

function _catchRoute(route = '') {
  if (PREV_ROUTE.name === route) {
    return
  }

  PREV_ROUTE.name = route

  if (ROUTES.contact.regex.test(route) /* [route] isContact */) {
    console.log('👨‍🚀 ~ LinkEvent ~ event:', route)
  }
  
  else if (ROUTES.home.regex.test(route) /* [route] isHome */) {
    console.log('👨‍🚀 ~ LinkEvent ~ event:', route)
  }
}
