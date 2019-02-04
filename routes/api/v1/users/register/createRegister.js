const router = require('express').Router({ mergeParams: true });
const validationResult = require('express-validator/check').validationResult;
const bcrypt = require('bcryptjs');
const appRoot = require('app-root-path');
const winstonOptions = require(appRoot + '/config/logging/winston');
const logger = require(appRoot + '/middleware/logging')(winstonOptions.devFile, winstonOptions.devConsole);

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
                if(error) throw error;
                // Set password to hash
                newUser.password = hash;
                try {
                    const savedUser = await newUser.save();
                    req.flash('success_msg', 'Registration was successful. You can now log in');
                    return res.redirect('/api/v1/users/login');
                } catch(error) {
                    logger.error(error);
                    req.flash('error_msg', 'An error occurred and registration failed. Contact the administrator (create register saving)');
                    return res.redirect('/api/v1/users/login');
                }
                
            })
        });
    } catch(error) {
        logger.error(error);
        req.flash('error_msg', 'An error occurred and registration failed. Contact the administrator (create register verification)');
        return res.redirect('/api/v1/users/login');
    }
});

module.exports = router;