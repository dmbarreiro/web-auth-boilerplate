
const winston = require('winston');

module.exports = (fileOptions, consoleOptions, outputFormat) => {
    const logger = winston.createLogger({
        format: outputFormat,
        transports: [
            new winston.transports.File(fileOptions),
            new winston.transports.Console(consoleOptions)
        ],
        exitOnError: false
    });
    
    logger.stream = {
        write: (message, encoding) => {
            logger.info(message);
        }
    }

    return logger;
};
