const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole);

router.post('/v1/users/login', (req, res, next) => {
    try{
        passport.authenticate('local',
        { successRedirect: '/api/v1/users/dashboard', 
          failureRedirect: '/api/v1/users/login',
          failureFlash: true })(req, res, next);
    } catch(error) {
        logger.error(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator');
        res.redirect('/api/v1/users/login');
    }
});

module.exports = router;