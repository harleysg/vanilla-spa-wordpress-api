import { getRelativeTime } from '../../helpers/internationalization.js'

export function Card(props) {
  const { title, link, date, url } = props
  let _date = ''
  let _link = ''

  if (date) {
    const _dateFormated = getRelativeTime(new Date(date).getTime())
    _date = `<time datetime="">${_dateFormated}</time>`
  }

  if (link || url) {
    _link = `<a href="${link || url}" target="_blank">Visit post</a>`
  }

  return `<div class="o-card">
    <div>
      ${title.rendered || title}
    </div>
    <div>
      ${_date}
      ${_link}
    </div>
  </div>`
}