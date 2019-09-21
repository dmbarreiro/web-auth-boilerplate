"use strict";

const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();

module.exports = {
    defaultErrorHandler(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        
        // add this line to include winston logging
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        
        // render the error page
        res.status(err.status || 500);
        req.flash('error_msg', 'An error occurred. Contact the administrator');
        return res.redirect('/api/v1/users/login');
    }
};
