export class ParamsError extends Error {
  constructor(msn) {
    const NAME = 'ParamsError'
    const MESSAGE = `${NAME} | ${msn}`

    super(MESSAGE)
    this.name = NAME
    this.reporter()
  }

  reporter() {
    // TODO: Include a reporter
  }
}