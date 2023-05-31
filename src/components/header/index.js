import { API, GET_DATA, FromEvent } from '../../helpers/index.js';

import { Search } from '../search/index.js';
import { Card } from '../card/index.js';

export function Header() {
  const $HEADER = Render('header')
  const $FORM = $HEADER.querySelector('form')
  const $BRAND = $HEADER.querySelector('figure')
  const SEARCHING = (value) => API('search')(value)

  FromEvent($FORM, 'submit').subscribe({
    next: (event) => {
      const { target } = event
      const formData = new FormData(target)
      const VALUE = (formData.get('search')?.toString() || '').trim()
      const DATA = SEARCHING(VALUE)

      $BRAND.textContent = VALUE
      GET_DATA(DATA, Card)
      target.reset()
    }
  });

  return $HEADER
}

function Render(tagName) {
  const $HEADER = document.createElement(tagName)
  const $HEADER_TMPL = `
    <div class="o-wrapper o-header__wrapper">
      <figure class="o-header__brand">Wordpress API</figure>
      <div class="o-header__menu">
        <nav class="o-header__nav"></nav>
        ${Search()}
      </div>
    </div>`

  $HEADER.classList.add('o-header')
  $HEADER.innerHTML = $HEADER_TMPL

  return $HEADER
}