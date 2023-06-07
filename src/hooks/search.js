import { API, GET_DATA, FromEvent } from '../helpers/index.js';
import { JS_CLASSNAMES } from '../constants/index.js';
import { Card } from '../components/card/index.js';

export function SearchHook({root}) {
  const $SEARCH_FORM = root.querySelector('.o-header form')
  const $BRAND = root.querySelector('.o-header figure')
  const $ASIDE = root.querySelector('#root-aside')
  const $ASIDE_CONTENT = $ASIDE.querySelector('#js-results')
  const $BODY  = document.body
  const SEARCHING = (value) => API('search')(value)
  
  FromEvent($SEARCH_FORM, 'submit').subscribe({
    next: (event) => {
      const { target } = event
      const formData = new FormData(target)
      const VALUE = (formData.get('search')?.toString() || '').trim()
      const DATA = SEARCHING(VALUE)

      $BRAND.textContent = 'Loading...'
      GET_DATA(DATA, Card, $ASIDE_CONTENT)
        .then(() => {
          $BRAND.textContent = VALUE
          $ASIDE.showModal()
          $BODY.classList.toggle(JS_CLASSNAMES.overflowHidden)
        })
        .finally(() => {
          target.reset()
        })
    }
  });
}