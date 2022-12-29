/**
 * Enumeration of log levels
 */
export const LOG_LEVELS = Object.freeze = {
  verbose: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  timer: 60,
  none: Infinity
}

/**
 * Lightweight class for console logging
 * with support for log levels
 */
export class Logger {
  #LOG_LEVEL

  /**
   * @param {number} level numeric value indicating minimum level that will be logged to console, see {@link LOG_LEVELS}
   */
  constructor (level = LOG_LEVELS.info) {
    this.#LOG_LEVEL = level
  }

  /**
   * Sets the log level
   * @param {number} level numeric value indicatingminimum level that will be logged to console, see {@link LOG_LEVELS}
   */
  setLevel (level) {
    this.#LOG_LEVEL = level
  }

  /**
   * Logs a verbose message
   * @param  {...any[]} msg
   */
  verbose (...msg) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.verbose) console.verbose(...msg)
  }

  /**
   * Logs a debug message
   * @param  {...any[]} msg
   */
  debug (...msg) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.debug) console.debug(...msg)
  }

  /**
   * Logs an info message
   * @param  {...any[]} msg
   */
  info (...msg) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.info) console.info(...msg)
  }

  /**
   * Logs a warn message
   * @param  {...any[]} msg
   */
  warn (...msg) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.warn) console.warn(...msg)
  }

  /**
   * Logs an error message
   * @param  {...any[]} msg
   */
  error (...msg) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.error) console.error(...msg)
  }

  /**
   * Starts a timer
   * @param {string} label Name of timer
   */
  time (label) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.timer) console.time(label)
  }

  /**
   * Logs the current time of an existing timer
   * @param {string} label Name of timer
   */
  timeLog (label) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.timer) console.timeLog(label)
  }

  /**
   * Stops a timer and logs the time
   * @param {string} label Name of timer
   */
  timeEnd (label) {
    if (this.#LOG_LEVEL <= LOG_LEVELS.timer) console.timeEnd(label)
  }
}

const instances = {}
/**
 * Retrieves an instance of a logger, creates new logger instance if needed
 * @param {string} name
 * @returns {Logger}
 */
export const getLogger = (name) => {
  if (!instances[name]) instances[name] = new Logger()
  return instances[name]
}

/**
 * Deletes an instance of a logger
 * NOTE: the logger will not be picked up by the garbage collector until all references are removed,
 * any local variables to the logger will still work until the GC can free up the memory
 * @param {string} name
 */
export const deleteLogger = (name) => {
  delete instances[name]
}
