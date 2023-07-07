import { API_FAIL_RESPONSE, STORAGE } from '../constants/index.js'
import { store, getStoreByKey } from '../utils/browser/storageEngine.js'

class ErrorFactory extends Error {
  constructor(MESSAGE, NAME, OPTIONS) {
    super(MESSAGE)
    this.name = NAME || 'ErrorFactory'
    this.response = JSON.parse(JSON.stringify(API_FAIL_RESPONSE))

    this.reporter(MESSAGE, OPTIONS)
  }

  async reporter(message, options) {
    this.response.message = message
    this.response.type = this.name
    this.response.origin = options?.origin ?? ''
    this.response.id = new Date().getTime()

    try {
      // TODO: Include a external reporter
      const listOfErrors = await this.getReports(STORAGE.errorsReported)
      store.setItem(STORAGE.errorsReported, JSON.stringify([...listOfErrors, this.response]))
    } catch (error) {
      // TODO
      console.warn({ 
        ...this.response,
        message: error
       })
    }

    return this.response
  }

  getReports = getStoreByKey
}

export class ContextError extends ErrorFactory {
  constructor(msn, options) {
    const _NAME = 'ContextError'
    super(`${_NAME} | ${msn}`, _NAME, options)
  }
}

export class ParamsError extends ErrorFactory {
  constructor(msn, options) {
    const _NAME = 'ParamsError'
    super(`${_NAME} | ${msn}`, _NAME, options)
  }
}

export class RouteError extends ErrorFactory {
  constructor(msn, options) {
    const _NAME = 'RouteError'
    super(`${_NAME} | ${msn}`, _NAME, options)
  }
}
