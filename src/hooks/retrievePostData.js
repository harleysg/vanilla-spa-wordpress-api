import { getRelativeTime } from '../helpers/internationalization.js'

export function retrievePostData(props) {
  const { id, title, link, date, url, excerpt, jetpack_featured_media_url, slug, _embedded } = props
  const data = {
    date: '',
    link: '',
    title: '',
    description: '',
    image: '',
    slug: '',
    id
  }

  if (excerpt && excerpt.rendered || _embedded?.self?.length > 0) {
    const origin = (excerpt?.rendered ?? _embedded.self[0]?.excerpt?.rendered) || ''
    data.description = origin.slice(3, 100).concat('...')
  }

  if (date) {
    data.date = getRelativeTime(new Date(date).getTime())
  }

  if (title.rendered || title) {
    data.title = title.rendered ?? title
  }

  if (jetpack_featured_media_url) {
    data.image = jetpack_featured_media_url
  }

  if (link || url || _embedded?.self?.length > 0) {
    data.link = link ?? url ?? _embedded?.self[0]?.link
  }
  
  if (slug || _embedded?.self?.length > 0) {
    data.slug = `#/${(slug || _embedded?.self[0]?.slug)}`
  }

  return data
}