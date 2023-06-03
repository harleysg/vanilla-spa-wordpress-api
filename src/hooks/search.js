import { API, GET_DATA, FromEvent } from '../helpers/index.js';
import { Card } from '../components/card/index.js';

export function SearchHook({root}) {
  const $SEARCH_FORM = root.querySelector('.o-header form')
  const $BRAND = root.querySelector('.o-header figure')
  const $ASIDE = root.querySelector('#root-aside')
  const $ASIDE_CONTENT = $ASIDE.querySelector('#js-results')
  const SEARCHING = (value) => API('search')(value)
  
  FromEvent($SEARCH_FORM, 'submit').subscribe({
    next: (event) => {
      const { target } = event
      const formData = new FormData(target)
      const VALUE = (formData.get('search')?.toString() || '').trim()

      $BRAND.textContent = 'Loading...'
      GET_DATA(SEARCHING(VALUE), Card, $ASIDE_CONTENT)
      .finally(() => {
          $BRAND.textContent = VALUE
          $ASIDE.showModal()
        })
      target.reset()
    }
  });
}