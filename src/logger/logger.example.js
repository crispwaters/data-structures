import { Logger, LOG_LEVELS, getLogger, deleteLogger } from './logger.js'

/**
 * Use getLogger and deleteLogger for managed logger instances
 */
const loggerName = 'myLogger'
const logger = getLogger(loggerName)
logger.debug('logger.debug: this won\'t be logger')
logger.info('logger.info: This will be logged')
logger.setLevel(LOG_LEVELS.debug)
logger.debug('logger.debug: This will now be logged')
deleteLogger(loggerName)
const newLogger = getLogger(loggerName)
newLogger.debug('logger.debug: new logger instance, this won\'t be logged')

/**
 * Create your own logger
 * NOTE: This means you are responsible for managing logger instance (e.g., need to pass to functions to use same logger instance)
 */
const myLogger = new Logger(LOG_LEVELS.debug)
myLogger.verbose('logger.verbose: This won\'t be logged')
myLogger.debug('logger.debug: This will be logged')
