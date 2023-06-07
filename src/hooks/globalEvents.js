import { Router } from './router.js'

export function GlobalEventsHook() {
  window.addEventListener('hashchange', Router)
}