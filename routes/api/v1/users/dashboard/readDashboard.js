const router = require('express').Router({ mergeParams: true });
const authLib = require('../../../../../lib/auth');

router.get('/v1/users/dashboard', authLib.ensureAuth, (req, res, next) => {
    try{
        res.render('dashboard', {
            user: { 
                name: req.user.name 
            }
        });
    } catch(error) {
        console.log(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator (read dashb)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;