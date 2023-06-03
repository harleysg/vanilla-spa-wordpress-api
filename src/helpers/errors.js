import { API_FAIL_RESPONSE } from '../constants/index.js'

export class ParamsError extends Error {
  constructor(msn) {
    const NAME = 'ParamsError'
    const MESSAGE = `${NAME} | ${msn}`

    super(MESSAGE)
    this.name = NAME
    this.response = JSON.parse(JSON.stringify(API_FAIL_RESPONSE))
    this.reporter()
  }

  reporter() {
    // TODO: Include a reporter
    this.response.message = this.message
    this.response.type = this.name

    return this.response
  }
}