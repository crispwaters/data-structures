import { Logger, LOG_LEVELS, getLogger, deleteLogger } from './logger.js'

const loggerName = 'myLogger'
const logger = getLogger(loggerName)
logger.debug('This won\'t be logger')
logger.info('This will be logged')
deleteLogger(loggerName)

const myLogger = new Logger(LOG_LEVELS.debug)
myLogger.verbose('This won\'t be logged')
myLogger.debug('This will be logged')
