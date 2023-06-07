import { JS_CLASSNAMES } from '../constants';

export async function SearchDialogEventHook({root}) {
  const $ASIDE = root.querySelector('#root-aside')
  const $BRAND = root.querySelector('.o-header figure')
  const $BODY  = document.body

  document.startViewTransition(() => {
    $ASIDE.addEventListener('close', () => {
      $BRAND.textContent = 'Wordpress API'
      $BODY.classList.toggle(JS_CLASSNAMES.overflowHidden)
    });
  })
}