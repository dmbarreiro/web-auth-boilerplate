
const express = require('express');
const path = require('path');
const router = require('./routes/createRouter')();
const envVar = require('./config/environment/variables');
const setMiddleware = require('./middleware/main');
const logger = require('./middleware/logging')();
const { defaultErrorHandler } = require('./lib/errorHandlers');
const listenPort = envVar.port || 3000;

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
