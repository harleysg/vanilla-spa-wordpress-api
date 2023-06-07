import { getRelativeTime } from '../helpers/internationalization.js'

export function retrievePostData(props) {
  const { title, link, date, url, excerpt, jetpack_featured_media_url } = props
  const data = {
    date: '',
    link: '',
    title: '',
    description: '',
    image: ''
  }

  if (excerpt && excerpt.rendered) {
    data.description = excerpt.rendered.slice(3, 100).concat('...')
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

  if (link || url) {
    data.link = link ?? url
  }

  return data
}