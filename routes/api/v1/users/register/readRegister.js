const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole, winstonOptions.timeFormat);

router.get('/v1/users/register', (req, res, next) => {
    try{
        res.render('register');
    } catch(err) {
        next(err);
        // logger.error(error);
        // req.flash('error_msg', 'An error occurred. Contact the administrator (read register)');
        // return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;