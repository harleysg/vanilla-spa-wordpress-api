const ISetLocation = {path: '', data: {}, title: ''}

const BrowserHistory = {
  back: () => window.history.back(),

  forward: () => window.history.forward(),

  go: (n) => window.history.go(n),

  setLocation: ({path, data, title} = ISetLocation) => {
    if (window.location.pathname !== path) {
      window.history.pushState(
        data,
        `${window.document.title} - ${title}`,
        path
      );
    }
  },

  updateLocation: ({path, data, title} = ISetLocation) => {
    if (window.location.pathname !== path) {
      window.history.replaceState(
        data,
        `${window.document.title} - ${title}`,
        path
      );
    }
  },


  updateTitle: ({title} = {title: ''}) => {
    window.document.title = title
  }
}

export default BrowserHistory