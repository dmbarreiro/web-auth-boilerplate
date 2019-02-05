const router = require('express').Router({ mergeParams: true });
const validationResult = require('express-validator/check').validationResult;
const bcrypt = require('bcryptjs');
const appRoot = require('app-root-path');

let User = require(appRoot + `/models/database/User`);

// User validation middleware
let userValidation = require(appRoot + '/lib/validationSchemas').user;

router.post('/v1/users/register', userValidation
, async function(req, res, next) {
    try{
        let errors = validationResult(req).array();
        const { name, email, password } = req.body;
        if(errors.length !== 0) {
            return res.render('register', { errors, name, email, password });
        }
        const foundUserEmail = await User.findOne({ email });
        if(foundUserEmail) {
            errors.push({ msg: 'Email is already registered'});
            return res.render('register', { errors, name, email, password });
        }
        const foundUserName = await User.findOne({ name});
        if(foundUserName) {
            errors.push({ msg: 'Name already taken'});
            return res.render('register', { errors, name, email, password });
        }
        const newUser = new User({ name, email, password });
        // Hash user password
        bcrypt.genSalt(12, (error, salt) => {
            bcrypt.hash(newUser.password, salt, async (error, hash) => {
                try {
                    if(error) throw error;
                    // Set password to hash
                    newUser.password = hash;
                    const savedUser = await newUser.save();
                    req.flash('success_msg', 'Registration was successful. You can now log in');
                    return res.redirect('/api/v1/users/login');
                } catch(err) {
                    next(err)
                }
                
            })
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;