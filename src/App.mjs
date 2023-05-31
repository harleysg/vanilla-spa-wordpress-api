import { Header } from './components/header/index.js';
import { Main } from './components/main/index.js';

const App = function ({root}) {
  render(root)
}

function render(root) {
  root.appendChild(Header())
  root.appendChild(Main())
}


export default App