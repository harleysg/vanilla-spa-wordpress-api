import { GLOBALS_WP_API, WP_API } from '../constants/index.js'
import { ContextError } from '../helpers/index.js'

export function GetContext() {
  return window[GLOBALS_WP_API]
}

export function SetContextValue(key, value) {
  if (key === 'ERROR') {
    return 
  }

  if (window[GLOBALS_WP_API][key]) {
    window[GLOBALS_WP_API][key] = value
  } else {
    new ContextError(`Key ${key} setted not exist`)
  }
}

export function InitContext(context) {
  let _context = context

  if (
      typeof context !== 'object' &&
      Array.isArray(context) &&
      context === null
  ) {
    new ContextError('New context is not a object')
    _context = WP_API
  }
  
  if (!Object.keys(context).length) {
    new ContextError('New context is empty')
    _context = WP_API
  }

  window[GLOBALS_WP_API] = _context

  return Promise.resolve(_context)
}
