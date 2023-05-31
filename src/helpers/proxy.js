const TARGET = {
  default: ''
}
const createAPI = (url, acceptedResources= []) => new Proxy(TARGET, {
  get: (...input) => {
    const { 1: PROPS } = input

    return async (id = '', queryPrams = '') => {
      /* ----------------------------------- */
      if (url === undefined || !url) return Promise.reject({
        status: 'fail',
        message: `URL not defined`
      })
      /* ----------------------------------- */
      if (acceptedResources.length === 0) return Promise.reject({
        status: 'fail',
        message: `accepted resources not defined`
      })
      /* ----------------------------------- */
      if (!acceptedResources.includes(PROPS)) return Promise.reject({
        status: 'fail',
        message: `Resource '${PROPS}' not accepted, please use: ${acceptedResources}`
      })
      /* ----------------------------------- */
      const QUERY_STRINGS = queryPrams
        ? `?${new URLSearchParams(queryPrams).toString()}`
        : ''
      /* ----------------------------------- */
      const END_POINT = url.includes('?')
      ? `${url}${id}`
      : `${url}/${id}${QUERY_STRINGS}`
      /* ----------------------------------- */
      const RESPONSE = await globalThis.fetch(END_POINT)
      /* ----------------------------------- */
      if (RESPONSE.ok) return Promise.resolve({
        status: 'ok',
        message: 'success',
        data: await RESPONSE.json()
      })
      else return Promise.reject({
        status: 'fail',
        message: 'Something wrong happened'
      })
    }
  },
  set: (target, prop, value) => {
    // TODO: Pending
    return true
  }
})

export default createAPI