import { ROUTES } from "../constants/index.js";
import _RouteService from '../services/route.service.js';

const PREV_ROUTE = {name: ''}

export async function _routeHandler() {
  const { hash } = window.location
  const _HASH = hash.split('#')[1] || '/'
  const _ROUTE = Object.entries(ROUTES).find(
    ([, path]) => path.anchor === _HASH
  );

  _catchRoute(_ROUTE ? [_ROUTE, _HASH] : [['otherwise'], _HASH])
}

function _catchRoute(route) {
  const [[name], hash] = route
  if (PREV_ROUTE.name === name) {
    return
  }
  
  PREV_ROUTE.name = name

  const RouteService = _RouteService()
  const currentRoute =  Object.entries(RouteService).find(([key]) => {
    if (key === name || ROUTES[key]?.regex.test(name)) {
      return key
    } else {
      return key === 'post'
    }
  })

  if (currentRoute) {
    const [name, triggerRoute] = currentRoute

    triggerRoute(name, hash)
  }
}
