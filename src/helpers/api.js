import { WP_API } from '../constants/index.js'
import { ParamsError } from './errors.js'
import API_CREATOR from "./proxy.js"

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

export async function GET_POST_CONTENT(PromiseCB) {
  const cleaner = response => {
    document.querySelector('#wp-post').innerHTML = ''
    document.querySelector('#wp-post').classList.remove('has-o-card')
    return response
  }
  const setter = ({status, data}) => {
    const posts = data?.content?.rendered
    const content = posts ? posts : `<div>error</div>`

    if (status === 'ok') {
      document.querySelector('#wp-post').innerHTML = content

      return data
    } else {
      return `<div>error</div>`
    }
  }

  return await PromiseCB
    .then(cleaner)
    .then(setter)
}

export async function GET_DATA(
  PromiseCB,
  $tmpl,
  $target,
) {
  const cleaner = response => {
    if ($target) {
      $target.innerHTML = ''
    } else {
      document.querySelector('#wp-post').innerHTML = ''
      document.querySelector('#wp-post').classList.add('has-o-card')
    }
    return response
  }

  const setter = ({status, data}) => {
    if (status === 'ok') {
      const posts = (data || []).map($tmpl)
      const content = posts ? posts.toString().replaceAll('/div>,<div','/div><div') : `<div>error</div>`

      if ($target) {
        $target.innerHTML = content
      } else {
        document.querySelector('#wp-post').innerHTML = content
      }

      return data
    } else {
      return `<div>error</div>`
    }
  }

  return await PromiseCB
    .then(cleaner)
    .then(setter)
}