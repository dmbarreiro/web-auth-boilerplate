const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole);

router.get('/v1/users/login', (req, res, next) => {
    try{
        res.render('login');
    } catch(error) {
        logger.error(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator (read login)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;