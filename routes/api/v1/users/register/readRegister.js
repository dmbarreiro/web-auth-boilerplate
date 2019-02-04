const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();

router.get('/v1/users/register', (req, res, next) => {
    try{
        res.render('register');
    } catch(err) {
        next(err);
    }
});

module.exports = router;