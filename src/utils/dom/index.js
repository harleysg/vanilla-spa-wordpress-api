import { WP_API } from '../../constants/index.js';
import BrowserHistory from '../browser/browserHistoryEngine.js';

function resetPage({route}) {
  BrowserHistory.updateTitle({title: `${WP_API.NAME} - ${route}`})
  _cleaner()
}

function _cleaner() {
  window.scrollTo(0,0)
  document.querySelector('#wp-post').innerHTML = ''
}

const updateCursor = ({ x, y }) => {
  document.documentElement.style.setProperty('--x', x)
  document.documentElement.style.setProperty('--y', y)
}

function confirmTypeOf(value) {
  return {
    isArray: Array.isArray(value),
    isString: typeof value === 'string',
    isObject: typeof value === 'object',
    isObjectStringified: _isObjectStringified(value),
    isNull: Object.is(value, null),
    isUndefined: Object.is(value, undefined),
    isNotValid: !value || Object.is(value, null) || Object.is(value, undefined)
  }
}

function _isObjectStringified(params) {
  if (typeof params === 'string' && params.length > 0) {
    return !!params.charAt(0).match(/[{|/\[/]/g) && !!params.charAt(params.length - 1).match(/[}|/\]/]/g)
  }
  return false
}

export {
  resetPage,
  updateCursor,
  confirmTypeOf
}