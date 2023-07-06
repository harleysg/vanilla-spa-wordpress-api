const NAME = 'css-tricks'
const DOMAIN = `https://${NAME}.com`
const SITE = `${DOMAIN}/wp-json`
const API_WP = `${SITE}/wp/v2`
const POSTS_RICH = `${API_WP}/posts?_embed`
const POSTS = `${API_WP}/posts`
const SEARCH = `${API_WP}/search?_embed&search=`
const CATEGORIES = `${API_WP}/categories`

export const STORAGE = {
  latestPosts: 'wp_home_list_of_post',
  latestPostRendered: 'wp_post_rendered',
  latestPostsSearched: 'wp_search_list_of_post',
  postsRendered: 'wp_list_of_post',
  errorsReported: 'app-error-reports'
}

export const API_RESPONSE = {
  status: '',
  message: '',
  date: new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(new Date()),
  data: []
}

export const API_FAIL_RESPONSE = {
  ...API_RESPONSE,
  status: 'fail',
  type: '',
  origin: ''
}

export const API_OK_RESPONSE = {
  ...API_RESPONSE,
  status: 'ok'
}

export const ROUTES = {
  read: {
    anchor: '/last-read',
    name: 'Last read',
    regex:  /last-read/,
    link:   '#/last-read',
    order:  3
  },
  contact: {
    anchor: '/contact',
    name:   'Contact',
    regex:  /contact/,
    link:   '#/contact',
    order:  2
  },
  home: {
    anchor: '/',
    name:   'Home',
    regex:  /^\s*$|\/|home/,
    link:   '#/',
    order:  1
  },
}

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
