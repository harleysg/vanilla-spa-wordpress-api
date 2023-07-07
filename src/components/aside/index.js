export function SearchDialog() {
  return Render('dialog')
}

function Render(tagName) {
  const $TAG_NAME = document.createElement(tagName)
  const $HEADER_TMPL = `
    <div class="o-wrapper o-aside__wrapper" aria-label="Dialog result">
      <header class="o-aside__header">
        Search results
        <button data-action="close">x</button>
      </header>
      <div id="js-results" class="o-aside__content"></div>
      <footer class="o-aside__footer"></footer>
    </div>`

  $TAG_NAME.classList.add('o-aside')
  $TAG_NAME.id = 'root-aside'
  $TAG_NAME.innerHTML = $HEADER_TMPL

  return $TAG_NAME
}