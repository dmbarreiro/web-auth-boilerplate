const appRoot = require('app-root-path');
const { format } = require('winston');

const generalProperties = {
    handleExceptions: true,
    json: false,
    colorize: true
};

module.exports = {
    devFile: {
        level: 'debug',
        filename: `${appRoot}/logs/app.dev.log`,
        maxsize: 1048576, // 1MB -> 1024*1024 bytes
        maxFiles: 3,
        ...generalProperties
    },
    testFile: {
        level: 'debug',
        filename: `${appRoot}/logs/app.test.log`,
        maxsize: 1048576, // 1MB -> 1024*1024 bytes
        maxFiles: 3,
        ...generalProperties
    },
    prodFile: {
        level: 'error',
        filename: `${appRoot}/logs/app.prod.log`,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        ...generalProperties
    },
    devConsole: {
        level: 'debug',
        ...generalProperties
    },
    prodConsole: {
        level: 'warning',
        ...generalProperties
    },
    timeFormat: format.combine(
        format.timestamp(),
        format.prettyPrint()
    )
};
