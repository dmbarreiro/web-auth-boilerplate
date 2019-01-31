const router = require('express').Router({ mergeParams: true });

router.get('/v1/users/register', (req, res, next) => {
    try{
        res.render('register');
    } catch(error) {
        console.log(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator (read register)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;