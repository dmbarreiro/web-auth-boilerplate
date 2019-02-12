"use strict";

const router = require('express').Router({ mergeParams: true });
const passport = require('passport');

router.post('/v1/users/login', (req, res, next) => {
    try{
        passport.authenticate('local',
        { successRedirect: '/api/v1/users/dashboard', 
          failureRedirect: '/api/v1/users/login',
          failureFlash: true })(req, res, next);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
