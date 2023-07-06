import { _routeHandler } from './routerHandler.js'

export function Router() {
  const preventDefault = () => {}
  window.addEventListener('hashchange', (e) => _routeHandler(e))
  _routeHandler({ preventDefault })
}

