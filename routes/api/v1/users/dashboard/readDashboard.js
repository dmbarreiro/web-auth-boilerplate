const router = require('express').Router({ mergeParams: true });
const appRoot = require('app-root-path');
const authLib = require('../../../../../lib/auth');

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