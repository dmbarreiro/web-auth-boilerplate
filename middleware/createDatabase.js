"use strict";


const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const logger = require( appRoot + '/middleware/logging')();
const envVar = require( appRoot + '/config/environment/variables');

module.exports = (configFile) => {  
    // Connect to MongoDb
    try {
        // MongoDb config
        let db = undefined;
        if(envVar.environment === 'test') {
            db = configFile.MongoTestURI;
        } else {
            db = configFile.MongoURI;
        }       
        const connection = mongoose.connect(db, { useNewUrlParser: true });
        if(envVar.environment !== 'production') logger.debug('MongoDB connected...');
        return mongoose.connection;
    } catch(err) {
        logger.error(`createDatase Error: ${err}`);
        process.exitCode = 1;
    }
};
