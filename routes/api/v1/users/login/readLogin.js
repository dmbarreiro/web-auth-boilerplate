const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();

router.get('/v1/users/login', (req, res, next) => {
    try{
        res.render('login');
    } catch(err) {
        next(err);
    }
});

module.exports = router;