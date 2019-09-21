"use strict";

const check = require('express-validator/check').check;

const validationSchemas = {
    "user": [
        check('name')
            .not().isEmpty().withMessage('Name cannot be empty'),
        check('email')
            .not().isEmpty().withMessage('E-mail cannot be empty')
            .isEmail().withMessage('E-mail field must contain a valid e-mail'),
        check('password')
            .not().isEmpty().withMessage('Password cannot be empty')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
            .custom((value, {req, loc, path}) => {
                if(req.body.password2) {
                  if(value !== req.body.password2) {
                    throw new Error('Passwords do not match');
                  }
                  return value;
                } else {
                  throw new Error('Confirmation password field cannot be empty');
                }
            })
    ]
}

module.exports = validationSchemas;
