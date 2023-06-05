import { SearchDialogEventHook } from './helpers/searchDialogEvents.js';
import { SearchHook } from './hooks/search.js';
import { GetPostHook } from './hooks/getPost.js';
import { Header } from './components/header/index.js';
import { Main } from './components/main/index.js';
import { SearchDialog } from './components/aside/index.js';

function App({root}) {
  render(root)
    .then($root => {
      hooks({root: $root})
    })
}

function render(root) {
  root.appendChild(Header())
  root.appendChild(Main())
  root.appendChild(SearchDialog())

  return Promise.resolve(root)
}

function hooks({root}) {
  SearchHook({root})
  SearchDialogEventHook({root})
  GetPostHook({root})
}


export default App