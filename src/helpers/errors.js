import { API_FAIL_RESPONSE, GLOBALS_WP_API } from '../constants/index.js'

class ErrorFactory extends Error {
  constructor(MESSAGE, NAME) {
    super(MESSAGE)
    this.name = NAME || 'ErrorFactory'
    this.response = JSON.parse(JSON.stringify(API_FAIL_RESPONSE))

    this.validateGlobalThis()
    this.reporter(MESSAGE)
  }

  reporter(message) {
    this.response.message = message
    this.response.type = this.name
    this.response.id = new Date().getTime()

    try {
      // TODO: Include a external reporter
      window.GLOBALS_WP_API.ERROR.push(this.response)
    } catch (error) {
      // TODO
      console.warn({ 
        ...this.response,
        message: 'Fail reporter: '.concat(message)
       })
    }

    return this.response
  }

  validateGlobalThis() {
    if (!window[GLOBALS_WP_API] && !window[GLOBALS_WP_API].ERROR) {
      window[GLOBALS_WP_API] = {
        ERROR: []
      }
    }
  }
}

export class ContextError extends ErrorFactory {
  constructor(msn) {
    const _NAME = 'ContextError'
    super(`${_NAME} | ${msn}`, _NAME)
  }
}

export class ParamsError extends ErrorFactory {
  constructor(msn) {
    const _NAME = 'ParamsError'
    super(`${_NAME} | ${msn}`, _NAME)
  }
}
