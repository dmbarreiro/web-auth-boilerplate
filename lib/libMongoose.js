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
            mongoose.connection.on("close", (err) => {
                if(err) throw err;
                logger.debug('MongoDB disconnected...');
            });
            mongoose.connection.on("open", (err, conn) => {
                if(err) throw err;
                if(envVar.environment !== 'production') logger.debug('MongoDB connected...');
                return conn;
            });
        } catch(err) {
            logger.error(`createDatase Error: ${err}`);
            process.exitCode = 1;
        }
    }
};
