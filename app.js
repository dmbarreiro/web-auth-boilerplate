
const express = require('express');
const path = require('path');
const router = require('./routes/createRouter')();
const environmentVar = require('./config/environment/variables');
const setMiddleware = require('./middleware/main');
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole);
const listenPort = environmentVar.port || 3000;

const app = express();

// Make /dist folder available
app.use(express.static(path.join(__dirname, './dist')));

setMiddleware(app, express, environmentVar);

// Routes setup
app.get('/', (req, res) => res.render('welcome'));
app.use('/api', router);
if(app.get('env') !== 'production')  {
    app.listen(listenPort, logger.debug(`Server started on port ${listenPort}`));
} else {
    app.listen(listenPort);
}
