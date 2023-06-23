import { retrievePostData } from '../../hooks/retrievePostData.js'
import { Image } from '../image/image.js'

export function Card(props) {
  const { title, link, date, image, description, slug } = retrievePostData(props)
  let _date = ''
  let _link = ''
  let _title = ''
  let _description = ''
  let _image = ''
  let _slug = ''
  let _hasImage = false

  description && (_description = `<p>${description}</p>`)
  date && (_date = `<time datetime="">${date}</time>`)
  title && (_title = `<h4 class="o-card__title">${title}</h4>`)
  link && (_link = `<a href="${link}" target="_blank">Visit post</a>`)
  slug && (_slug = `<a href="${slug}">View post</a>`)
  image && (_image = Image({src: image}).outerHTML)

  _hasImage = !!_image

  return `<div class="o-card ${_hasImage ? 'has-image' : ''}">
    <div class="o-card__wrapper">
      <div class="o-card__header">
        ${_image}
        ${_title}
      </div>
      <div class="o-card__body">
        ${_description}
      </div>
      <div class="o-card__footer">
        ${_date}
        ${_slug ? _slug : _link}
      </div>
    </div>
  </div>`
}

export function CardSearchResult (props) {
  const { title, link } = retrievePostData(props)
  let _link = ''
  let _title = ''

  title && (_title = `<h4 class="o-card__title">${title}</h4>`)
  link && (_link = `<a href="${link}" target="_blank">Visit post</a>`)

  return `<div class="o-card">
    <div class="o-card__wrapper">
      <div class="o-card__header">
        ${_title}
      </div>
      <div class="o-card__footer">
        ${_link}
      </div>
    </div>
  </div>`
}
