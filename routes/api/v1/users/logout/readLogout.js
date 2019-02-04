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
    }
});

module.exports = router;