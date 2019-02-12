"use strict";

const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();
const envVar = require( appRoot + '/config/environment/variables');

module.exports = {
    gracefulConnectionDrop(connectionArray) {
        if(connectionArrray.length != 0) {
            connectionArray.forEach((connection) => {
                connection.close(() => {
                    logger.debug('Mongoose default connection was correctly cleared.');
                    //process.exit(0);
                });
            });
        }
    },
    createMongodbConnection(configFile) {  
        // Connect to MongoDb
        try {
            // MongoDb config
            let db = undefined;
            if(envVar.environment === 'test') {
                db = configFile.MongoTestURI;
            } else {
                db = configFile.MongoURI;
            }       
            const connection = mongoose.connect(db, configFile.options);
            if(envVar.environment !== 'production') logger.debug('MongoDB connected...');
            return mongoose.connection;
        } catch(err) {
            logger.error(`createDatase Error: ${err}`);
            process.exitCode = 1;
        }
    }
};
