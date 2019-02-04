const appRoot = require('app-root-path');

module.exports = {
    devFile: {
        level: 'debug',
        filename: `${appRoot}/logs/app.dev.log`,
        handleExceptions: true,
        json: true,
        maxsize: 1048576, // 1MB -> 1024*1024 bytes
        maxFiles: 3,
        colorize: false
    },
    devConsole: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    prodFile: {
        level: 'error',
        filename: `${appRoot}/logs/app.prod.log`,
        handleExceptions: true,
        json: true,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        colorize: false
    },
    prodConsole: {
        level: 'warning',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};
