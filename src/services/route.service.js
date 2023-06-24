import { WP_API } from "../constants/index.js";
import BrowserHistory from '../hooks/browser/browserHistoryEngine.js';
import { GetLatestPostHook, GetPostBy } from '../hooks/getPost.js';

export default function RouteService() {
  return {
  contact: (route) => {
    BrowserHistory.updateTitle({title: `${WP_API.NAME} - ${route}`})
    _cleaner()
  },
  home: (route) => {
    BrowserHistory.updateTitle({title: `${WP_API.NAME} - ${route}`})
    _cleaner()
    GetLatestPostHook()
  },
  post: (route, hash) => {
    BrowserHistory.updateTitle({title: `${WP_API.NAME} - ${route}`})
    _cleaner()
    GetPostBy(hash)
  }
}}

function _cleaner() {
  document.querySelector('#wp-post').innerHTML = ''
}
