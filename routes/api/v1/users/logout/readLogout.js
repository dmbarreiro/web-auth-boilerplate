const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();

router.get('/v1/users/logout', (req, res, next) => {
    try{
        req.logout();
        req.flash('success_msg', 'You logged out successfully');
        res.redirect('/api/v1/users/login');
    } catch(err) {
        next(err);
        // logger.error(err);
        // req.flash('error_msg', 'An error occurred. Contact the administrator (read logout)');
        // return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;