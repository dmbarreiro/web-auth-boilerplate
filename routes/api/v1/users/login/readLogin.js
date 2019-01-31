const router = require('express').Router({ mergeParams: true });

router.get('/v1/users/login', (req, res, next) => {
    try{
        res.render('login');
    } catch(error) {
        console.log(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator (read login)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;