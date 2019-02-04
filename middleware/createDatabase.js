
const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole);

module.exports = (configFile) => {
    // MongoDb config
    const db = configFile.MongoURI;
    // Connect to MongoDb
    try {
        const connection = mongoose.connect(db, { useNewUrlParser: true });
        if(app.get('env') !== 'production') logger.debug('MongoDB connected...');
        return mongoose.connection;
    } catch(error) {
        logger.error(error)
        process.exitCode = 1;
    }
};

