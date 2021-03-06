"use strict";

const appRoot = require('app-root-path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportStrategy = require('./passport.js')(passport);
const envVar = require(appRoot + '/config/environment/variables');
const logger = require(appRoot + '/middleware/logging')();

module.exports = (app, express, dBaseConnection) => {

    //Environment dependent configuration
    if(envVar.environment === "development") {            
        // Morgan HTTP request middleware
        const morgan = require('morgan');
        app.use(morgan('combined', { stream: logger.stream }));
        logger.debug('We are in development environment.');
    } else if(envVar.environment === "production") {
        const compression = require('compression');
        app.use(compression({ threshold: 0 }));
    };

    // ejs setup
    app.use(expressLayouts);
    app.set('view engine', 'ejs');

    // bodyparser setup
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // express-session middleware
    const sessionConfig = {
        secret: 's1cR3t keyboard cat',
        resave: true,
        saveUninitialized: false,
        cookie: { secure: false }
    };
    // In production client will only send the cookie if connection is secure (HTTPS)
    if(app.get('env') === 'production') {
        //sessionConfig.cookie.secure = true;
        const MongoStore = require('connect-mongo')(session);
        sessionConfig.store = new MongoStore({ mongooseConnection: dBaseConnection })
    };

    app.use(session(sessionConfig));
    // Once session is setup (requirement for flash) we add connect-flash
    app.use(flash());

    // Set connect-flash information variables. Default types used by
    // passportjs. Custom types used by the app.
    app.use((req, res, next) => {
        res.locals.flash_success = req.flash('success'); // default type
        res.locals.flash_error = req.flash('error'); // default type
        res.locals.error_msg = req.flash('error_msg'); // custom type
        res.locals.success_msg = req.flash('success_msg'); // custom type
        next();
    });

    // passportjs authentication middleware
    app.use(passport.initialize());
    app.use(passport.session());

};
