
const winston = require('winston');
const envVar = require('../config/environment/variables');
if(envVar.environment === 'production') {
    // Defined with var, let and const are block scope since ES2017
    var { prodFile: fileOptions, prodConsole: consoleOptions, timeFormat: outputFormat } = require('../config/logging/winston');
} else if(envVar.environment === 'test') {
    var { testFile: fileOptions, timeFormat: outputFormat } = require('../config/logging/winston');
} else {
    var { devFile: fileOptions, devConsole: consoleOptions, timeFormat: outputFormat } = require('../config/logging/winston');
}

 const setUpLogger = () => {

    const transportsArray = Array();

    // Disable console logging to avoid interfering with Mocha
    if(envVar.environment === 'test') {
        transportsArray.push(new winston.transports.File(fileOptions));
    } else {
        transportsArray.push(new winston.transports.File(fileOptions),
                              new winston.transports.Console(consoleOptions));
    }

    let logger = winston.createLogger({
        format: outputFormat,
        transports: transportsArray,
        exitOnError: false
    });
    
    if(envVar.environment === 'development') {
        logger.stream = {
            write: (message, encoding) => {
                logger.info(message);
            }
        }
    }

    return logger;
};

module.exports = setUpLogger;