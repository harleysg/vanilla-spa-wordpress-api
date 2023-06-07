export function Menu() {
  return Render()
}

function Render() {
  const $EL = document.createElement('nav')
  const items = [{ text: 'Home', link: '#/'}, {text: 'contant', link: '#/contact' }]

  $EL.classList.add('o-header__nav')
  $EL.innerHTML = items
    .map(({text, link}) => `<a href="${link}"> ${text} </a>`)
    .join('')

  return $EL
}