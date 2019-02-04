
const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole, winstonOptions.timeFormat);
const envVar = require(appRoot + '/config/environment/variables');

module.exports = (configFile) => {  
    // Connect to MongoDb
    try {
        // MongoDb config
        const db = configFile.MongoURI;
        const connection = mongoose.connect(db, { useNewUrlParser: true });
        if(envVar.environment !== 'production') logger.debug('MongoDB connected...');
        return mongoose.connection;
    } catch(err) {
        logger.error(`createDatase Error: ${err}`);
        process.exitCode = 1;
    }
};
