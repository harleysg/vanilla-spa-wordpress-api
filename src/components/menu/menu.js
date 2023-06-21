import { ROUTES } from '../../constants/index.js'

export function Menu() {
  return Render()
}

function Render() {
  const $EL = document.createElement('nav')
  const menuSorted = Object.entries(ROUTES)
    .sort((a, b) => {
      const [, prev_a] = a, [, prev_b] = b
      if (prev_a.order < prev_b.order) return -1
      if (prev_a.order > prev_b.order) return 1
      return 0
    })

  $EL.classList.add('o-header__nav')
  $EL.innerHTML = menuSorted
    .map(([, {link, name, anchor}]) => `<a href="${link}" sg-route="${anchor}"> ${name} </a>`)
    .join('')

  return $EL
}