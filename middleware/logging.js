
const winston = require('winston');
const envVar = require('../config/environment/variables');
if(envVar.environment !== 'production') {
    // Defined with var, let and const are block scope since ES2017
    var { devFile: fileOptions, devConsole: consoleOptions, timeFormat: outputFormat } = require('../config/logging/winston');
} else {
    var { prodFile: fileOptions, prodConsole: consoleOptions, timeFormat: outputFormat } = require('../config/logging/winston');
}

 const setUpLogger = () => {
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

module.exports = setUpLogger;