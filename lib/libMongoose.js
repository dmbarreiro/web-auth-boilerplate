"use strict";

const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();
const envVar = require( appRoot + '/config/environment/variables');

module.exports = {
    gracefulConnectionDrop(connectionArray) {
        if(connectionArray.length != 0) {
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
            let dbURI = undefined;
            if(envVar.environment === 'test') {
                dbURI = configFile.MongoTestURI;
            } else {
                dbURI = configFile.MongoURI;
            }       
            mongoose.connect(dbURI, configFile.options, (err) => {
                if(err) throw err;
            });
            const connection = mongoose.connection;
            connection.on("close", (err) => {
                if(err) throw err;
                logger.debug('MongoDB disconnected...');
            });
            connection.on("error", function(err) {
                logger.error(`Failed to connect to DB ${configFile.MongoURI}`, err);
            });
            connection.on("open", (err) => {
                if(err) throw err;
                if(envVar.environment !== 'production') logger.debug('MongoDB connected...');
            });
            return connection;
        } catch(err) {
            logger.error(`createDatase Error: ${err}`);
            process.exitCode = 1;
        }
    }
};
