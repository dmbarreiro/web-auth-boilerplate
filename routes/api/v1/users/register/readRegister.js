"use strict";

const router = require('express').Router({ mergeParams: true });

router.get('/v1/users/register', (req, res, next) => {
    try{
        res.render('register');
    } catch(err) {
        next(err);
    }
});

module.exports = router;
