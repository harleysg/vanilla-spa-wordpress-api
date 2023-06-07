const _options = {
  src: ''
}

export function Image(options = _options) {
  return Render(options)
}

function Render({src}) {
  const $EL = document.createElement('img')
  
  $EL.src = src
  $EL.classList.add('o-card__image')

  return $EL
}
