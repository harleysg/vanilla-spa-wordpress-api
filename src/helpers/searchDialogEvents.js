export function SearchDialogEventHook({root}) {
  const $ASIDE = root.querySelector('#root-aside')
  const $BRAND = root.querySelector('.o-header figure')

  $ASIDE.addEventListener('close', (e) => {
    $BRAND.textContent = 'Wordpress API'
  });
}