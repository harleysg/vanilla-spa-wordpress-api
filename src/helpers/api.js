import { ParamsError } from './errors.js'
import API_CREATOR from "./proxy.js"
import WP_API from "./wp_api.js"

const ACCEPTED_RESOURCES = WP_API.ACCEPTED_RESOURCES

const CALLS = {
    postEmbebed: API_CREATOR(WP_API.POSTS_RICH, ['postEmbebed']),
    posts: API_CREATOR(WP_API.POSTS, ['posts']),
    categories: API_CREATOR(WP_API.CATEGORIES, ['categories']),
    search: API_CREATOR(WP_API.SEARCH, ['search'])
  }
/**
 * @typedef StandardResponse
 * @property {string} status 
 * @property {string} message 
 * @property {array} data 
 */
/**
 * Please uses the follow accepted resource
 * @requires 'postEmbebed' | 'posts' | 'search'
 * @returns {Promise<StandardResponse>} Promise to a StandardResponse
 */
export function API(endpoint) {  
  try {
    if (!endpoint)
      throw new ParamsError('endpoint no defined')
    if (!Object.keys(ACCEPTED_RESOURCES).includes(endpoint))
      throw new ParamsError('endpoint no accepted')
    if (endpoint === ACCEPTED_RESOURCES.search)
      return async (queryPrams) => CALLS[endpoint][endpoint](queryPrams)
    
    return CALLS[endpoint][endpoint]()
  } catch (error) {
    if (error instanceof ParamsError) {
      return Promise.resolve({
        status: 'fail',
        message: error.message,
        data: []
      })
    }
  }
}

export async function GET_DATA(PromiseCB, TMPL) {
  const cleaner = response => {
    document.querySelector('#wp-post').innerHTML = ''
    return response
  }

  const setter = ({status, data}) => {
    if (status === 'ok') {
      const posts = data.map(TMPL)
      const content = posts.toString().replaceAll('/div>,<div','/div><div')

      document.querySelector('#wp-post').innerHTML = content
    } else {
      return `<div>error</div>`
    }
  }
  
  return await PromiseCB
    .then(cleaner)
    .then(setter)
}