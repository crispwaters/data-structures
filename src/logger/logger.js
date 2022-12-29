export const LOG_LEVELS = Object.freeze = {
  verbose: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  timer: 60,
  none: Infinity
}

export class Logger {
  #LOG_LEVEL
  constructor (level = LOG_LEVELS.info) {
    this.#LOG_LEVEL = level
  }

  setLevel (level) {
    this.#LOG_LEVEL = level
  }
}
