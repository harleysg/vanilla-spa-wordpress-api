export function Card(props) {
  const { title } = props

  return `<div class="o-card">
    <div>
      ${title.rendered || title}
    </div>
    <div></div>
  </div>`
}