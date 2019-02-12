"use strict";

const express = require('express');
const path = require('path');
const router = require('./routes/createRouter')();
const envVar = require('./config/environment/variables');
const setMiddleware = require('./middleware/main');
const { defaultErrorHandler } = require('./lib/errorHandlers');
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
const logger = require('./middleware/logging')();

const app = express();

// Make /dist folder available
app.use(express.static(path.join(__dirname, './dist')));

setMiddleware(app, express, envVar);

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
    app.listen(listenPort, logger.debug(`Server started on port ${listenPort}`));
} else {
    app.listen(listenPort);
}
