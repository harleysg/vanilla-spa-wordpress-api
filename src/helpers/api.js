import { WP_API } from '../constants/index.js'
import { ParamsError } from './errors.js'
import API_CREATOR from "./proxy.js"

const ACCEPTED_RESOURCES = WP_API.ACCEPTED_RESOURCES
const POST_NOT_FOUND = `<div>
  <h1 class="o-heading o-heading--1">Post don't exist</h1>
  <p>Please go to <a href="#/">Home</a></p>
</div>`
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
export function API(endpoint, id) {
  try {
    if (!endpoint)
      throw new ParamsError('endpoint no defined')
    if (!Object.keys(ACCEPTED_RESOURCES).includes(endpoint))
      throw new ParamsError('endpoint no accepted')
    if (endpoint === ACCEPTED_RESOURCES.search)
      return async (queryPrams) => CALLS[endpoint][endpoint](queryPrams)
    
    return CALLS[endpoint][endpoint](id)
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

export async function RENDER_POST_CONTENT(PromiseCB, option) {
  const cleaner = response => {
    document.querySelector('#wp-post').innerHTML = ''
    document.querySelector('#wp-post').classList.remove('has-o-card')
    return response
  }
  const setter = ({status, data}) => {
    const posts = data?.content?.rendered
    const content = posts 
      ? `
      <article id="${data?.slug}" class="o-post_rendered">
        ${option && option.openDialog ? `<a onclick="document.querySelector('#root-aside')?.showModal()">Show results</a>` : ''}
        ${data?.title?.rendered ? `<h1 class="o-heading o-heading--1">${data?.title?.rendered}</h1>` : ''}
        <section>${posts}</section>
      </article>
      `
      : POST_NOT_FOUND

    if (status === 'ok') {
      document.querySelector('#wp-post').innerHTML = content

      return data
    } else {
      document.querySelector('#wp-post').innerHTML = POST_NOT_FOUND

      return POST_NOT_FOUND
    }
  }
  const error = () => {
    document.querySelector('#wp-post').innerHTML = POST_NOT_FOUND

      return POST_NOT_FOUND
  }

  return await PromiseCB
    .then(cleaner)
    .then(setter)
    .catch(error)
}

export async function RENDER_LIST_OF_POST(
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
      return POST_NOT_FOUND
    }
  }

  return await PromiseCB
    .then(cleaner)
    .then(setter)
}