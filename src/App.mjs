import { CursorHook } from './hooks/cursorHook.js';
import { SearchHook } from './hooks/searchHook.js';
import { Router } from './router/index.js';
import { Header } from './components/header/index.js';
import { Main } from './components/main/index.js';
import { SearchDialog } from './components/aside/index.js';

function App({root}) {
  render(root)
    .then(Router)
    .finally(() => {
      SearchHook({root})
      CursorHook()
    })
  }

function render(root) {
  root.appendChild(Header())
  root.appendChild(Main())
  root.appendChild(SearchDialog())

  return Promise.resolve(root)
}

export default App