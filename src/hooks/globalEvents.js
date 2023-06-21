import { Router, LinkEvent } from './router.js'

export function GlobalEventsHook() {
  handleHashChange()
  handleLinkEvent()
}

function handleLinkEvent() {
  document.addEventListener('click', LinkEvent)
}

function handleHashChange() {
  const preventDefault = () => {}
  window.addEventListener('hashchange', () => Router({preventDefault}))
  Router({ preventDefault })
}
