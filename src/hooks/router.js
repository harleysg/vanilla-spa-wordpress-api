import { ROUTES } from "../constants/index.js";
import _RouteService from '../services/route.service.js';

const PREV_ROUTE = {name: ''}

export async function Router() {
  const { hash } = window.location
  const _HASH = hash.split('#')[1] || '/'
  const _ROUTE = Object.entries(ROUTES).find(
    ([, path]) => path.anchor === _HASH
  );

  _catchRoute(_ROUTE ? [_ROUTE, _HASH] : ['otherwise', _HASH])
}

export async function LinkEvent(event) {
  const { target } = event
  const routerLinks = document.querySelectorAll('[sg-route]')

  if (routerLinks.length) {
    const ROUTER_VALUE = target.attributes.getNamedItem('sg-route')

    if (ROUTER_VALUE) {
      // TODO
    }
    
  }
}

function _catchRoute(route) {
  const [name, hash] = route
  if (PREV_ROUTE.name === name) {
    return
  }

  PREV_ROUTE.name = name

  const RouteService = _RouteService()
  const currentRoute =  Object.entries(RouteService).find(([key, fn]) => {
    if (key === name || ROUTES[key]?.regex.test(name)) {
      return key === name || ROUTES[key]?.regex.test(name)
    } else {
      return key === 'post'
    }
  })

  if (currentRoute) {
    const [name, triggerRoute] = currentRoute

    triggerRoute(name, hash)
  }
}
