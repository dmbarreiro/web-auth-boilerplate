"use strict";

const glob = require('glob');
const router = require('express').Router;

module.exports = () => glob
    .sync('**/*.js', { cwd: `${__dirname}/` })
    .filter(filename => !filename.includes("test"))  // do not import mocha test files
    .map(filename => require(`./${filename}`))
    .filter(element => Object.getPrototypeOf(element) == router)
    .reduce((rootRouter, importRouter) => { 
        return rootRouter.use(importRouter)
    }, router({ mergeParams: true}));
