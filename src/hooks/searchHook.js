import { JS_CLASSNAMES, STORAGE } from '../constants/index.js';
import { API, RENDER_LIST_OF_POST, FromEvent } from '../helpers/index.js';
import { store } from '../utils/browser/storageEngine.js';
import BrowserHistory from '../utils/browser/browserHistoryEngine.js';
import { SearchingPostById } from './getPost.js';
import { CardSearchResult } from '../components/card/index.js';

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
      RENDER_LIST_OF_POST(DATA, CardSearchResult, $ASIDE_CONTENT)
        .then(async (resultSearch) => {
          store.setItem(
            STORAGE.latestPostsSearched,
            JSON.stringify(resultSearch)
          )
          $BRAND.textContent = VALUE
          $ASIDE.showModal()
          $BODY.classList.add(JS_CLASSNAMES.overflowHidden)
        })
        .finally(() => {
          target.reset()
        })
    }
  });

  $ASIDE.addEventListener('close', () => {
    $BRAND.textContent = 'Wordpress API'
    $BODY.classList.remove(JS_CLASSNAMES.overflowHidden)
  });

  $ASIDE.addEventListener('click', function (event) {
    const { target } = event

    if (target.dataset && target.dataset.action === 'close') {
      $ASIDE.close()
    }
    else if (target.dataset && target.dataset.action === 'getPost' && target.dataset.id) {
      SearchingPostById(target.dataset.id)
        .then(page => {
          BrowserHistory.setLocation({
            path: `#/${page.slug}`,
            data: {},
            title: page.title?.rendered || ''
          })
        }).finally(() => {
          $ASIDE.close()
        })
    }
  })
}
