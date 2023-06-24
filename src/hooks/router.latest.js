import { ROUTES } from "../constants/index.js";
import '../libs/navigo@8.11.1.amd.min.js'; // When using ES modules.

const ROUTER = new Navigo('/');

function _loadRoutes() {
  const routerLinks = document.querySelectorAll('[sg-route]')
  const links = [].slice.call(routerLinks)

  links.forEach(link => {
    const ROUTER_VALUE = link.attributes.getNamedItem('sg-route')
    ROUTER.on(ROUTER_VALUE.value, function (macth) {
      // do something
    });
  });
}

function _catchRoute(route = '') {
  if (PREV_ROUTE.name === route) {
    return
  }

  PREV_ROUTE.name = route

  if (ROUTES.home.regex.test(route) /* [route] isHome */) {
    ROUTER.navigate('/')
  }
  
  else if (ROUTES.contact.regex.test(route) /* [route] isContact */) {
    ROUTER.navigate(route)
  }
}
