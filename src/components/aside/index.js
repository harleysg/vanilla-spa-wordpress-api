export function SearchDialog() {
  return Render('dialog')
}

function Render(tagName) {
  const $TAG_NAME = document.createElement(tagName)
  const $HEADER_TMPL = `
    <div class="o-wrapper o-aside__wrapper">
      <div id="js-results" class="o-content"></div>
    </div>`

  $TAG_NAME.classList.add('o-aside')
  $TAG_NAME.id = 'root-aside'
  $TAG_NAME.innerHTML = $HEADER_TMPL

  return $TAG_NAME
}