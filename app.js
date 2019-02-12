"use strict";

const appRoot = require('app-root-path');
const express = require('express');
const path = require('path');
const router = require(appRoot + '/routes/createRouter')();
const envVar = require(appRoot + '/config/environment/variables');
const setMiddleware = require(appRoot + '/middleware/main');
const { defaultErrorHandler } = require(appRoot + '/lib/errorHandlers');
const { gracefulConnectionDrop, createMongodbConnection } = require(appRoot + '/lib/libMongoose.js');
const listenPort = envVar.port || 3000;
/* 
When creating a logger instance per file I started getting a MaxListenersExceededWarning.
Warning went away when logger instances were removed from the files were not
using them. Problem was fixed on Winston Pull #1344 for file and #1513 silences
warnings for console transport, it still has to be fixed for console. My Winston version
does not have pulls #1344 or #1513 (or both) I think cause I still see the warning.
Winston Bug Report in Github is #1334.
If we see it in the future again it is possible to fix it (at the moment at least)
increasing the maximum number of listeners from 10 to 15:
    process.setMaxListeners(15);
*/

// Setting up winston logger
const logger = require(appRoot + '/middleware/logging')();

const app = express();

// Make /dist folder available
app.use(express.static(path.join(__dirname, './dist')));

// Setting up MongoDb connection
const dbConnectionArray = Array();
const dBaseConfig = require(appRoot + '/config/database/keys');
dbConnectionArray.push(createMongodbConnection(dBaseConfig));

setMiddleware(app, express, dbConnectionArray[0]);

// Routes setup
app.get('/', (req, res, next)  => {
    try{
        res.render('welcome');
    } catch(err) {
        next(err);
    }
});
app.use('/api', router);

// Default request error handler
app.use(defaultErrorHandler);

if(app.get('env') !== 'production')  {
    module.exports = app.listen(listenPort, logger.debug(`Server started on port ${listenPort}`));
} else {
    module.exports = app.listen(listenPort);
}

