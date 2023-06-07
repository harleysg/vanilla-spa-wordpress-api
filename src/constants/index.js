export const API_RESPONSE = {
  status: '',
  message: '',
  date: new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(new Date()),
  data: []
}

export const API_FAIL_RESPONSE = {
  ...API_RESPONSE,
  status: 'fail',
  type: ''
}

export const API_OK_RESPONSE = {
  ...API_RESPONSE,
  status: 'ok'
}

const NAME = 'css-tricks'
const DOMAIN = `https://${NAME}.com`
const SITE = `${DOMAIN}/wp-json`
const API_WP = `${SITE}/wp/v2`
const POSTS_RICH = `${API_WP}/posts?_embed`
const POSTS = `${API_WP}/posts`
const SEARCH = `${API_WP}/search?_embed&search=`
const CATEGORIES = `${API_WP}/categories`

export const GLOBALS_WP_API = 'GLOBALS_WP_API'
export const WP_TARGET = (name = NAME) => name

const ACCEPTED_RESOURCES = {
  postEmbebed: 'postEmbebed',
  posts: 'posts',
  categories: 'categories',
  search: 'search'
}

export const WP_API = {
  ACCEPTED_RESOURCES,
  API_WP,
  CATEGORIES,
  DOMAIN,
  NAME,
  POSTS_RICH,
  POSTS,
  SEARCH,
  SITE,
  ERROR: []
}

export const GET_WP_API = (name = NAME) => name

export const JS_CLASSNAMES = {
  overflowHidden: 'is-overflow-hidden'
}
