import { Loading } from '../loading/index.js';

export function Main() {
  const $MAIN = Render('main')

  return $MAIN
}

function Render(tagName) {
  const $MAIN = document.createElement(tagName)
  const $MAIN_TMPL = `
    <div class="o-wrapper">
      <div id="wp-post" class="o-content"></div>
      ${Loading()}
    </div>`

  $MAIN.classList.add('o-main')
  $MAIN.innerHTML = $MAIN_TMPL

  return $MAIN
}
