import { GLOBALS_WP_API } from '../../constants/index.js';
import { Search } from '../search/index.js';

export function Header() {
  return Render('header')
}

function Render(tagName) {
  const $HEADER = document.createElement(tagName)
  const $HEADER_TMPL = `
    <div class="o-wrapper o-header__wrapper">
      <figure class="o-header__brand">
        ${window[GLOBALS_WP_API].NAME} API
      </figure>
      <div class="o-header__menu">
        <nav class="o-header__nav"></nav>
        ${Search()}
      </div>
    </div>`

  $HEADER.classList.add('o-header')
  $HEADER.innerHTML = $HEADER_TMPL

  return $HEADER
}