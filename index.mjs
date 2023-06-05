import { WP_API } from './src/constants/index.js';
import { InitContext } from './src/hooks/context.js';

import App from "./src/App.mjs";

InitContext(WP_API)
  .then(() => {
    App({
      root: document.querySelector('#root')
    })
  })
