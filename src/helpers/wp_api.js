const WP_TARGET = (name) => name

const NAME = 'css-tricks'
const DOMAIN = `https://${NAME}.com`
const SITE = `${DOMAIN}/wp-json`
const API_WP = `${SITE}/wp/v2`
const POSTS_RICH = `${API_WP}/posts?_embed`
const POSTS = `${API_WP}/posts`
const SEARCH = `${API_WP}/search?_embed&search=`
const CATEGORIES = `${API_WP}/categories`

const ACCEPTED_RESOURCES = {
  postEmbebed: 'postEmbebed',
  posts: 'posts',
  categories: 'categories',
  search: 'search'
}

export default {
  ACCEPTED_RESOURCES,
  API_WP,
  CATEGORIES,
  DOMAIN,
  NAME,
  POSTS_RICH,
  POSTS,
  SEARCH,
  SITE,
}