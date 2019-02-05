const router = require('express').Router({ mergeParams: true });

router.get('/v1/users/login', (req, res, next) => {
    try{
        res.render('login');
    } catch(err) {
        next(err);
    }
});

module.exports = router;