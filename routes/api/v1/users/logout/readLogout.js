const router = require('express').Router({ mergeParams: true });

router.get('/v1/users/logout', (req, res, next) => {
    try{
        req.logout();
        req.flash('success_msg', 'You logged out successfully');
        res.redirect('/api/v1/users/login');
    } catch(error) {
        console.log(error);
        req.flash('error_msg', 'An error occurred. Contact the administrator (read logout)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;