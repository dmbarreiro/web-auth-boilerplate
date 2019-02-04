const router = require('express').Router({ mergeParams: true });
const authLib = require('../../../../../lib/auth');
const appRoot = require('app-root-path');
const logger = require(appRoot + '/middleware/logging')();

router.get('/v1/users/dashboard', authLib.ensureAuth, (req, res, next) => {
    try{
        res.render('dashboard', {
            user: { 
                name: req.user.name 
            }
        
        });
        res.flush();
    } catch(err) {
        next(err);
    }
});

module.exports = router;