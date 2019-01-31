
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/createRouter')();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportStrategy = require('./config/passport/passport')(passport);
const listenPort = process.env.PORT || 3000;

const app = express();

// MongoDB setup
const dBaseConfigFile = require('./config/database/keys');
require('./database/createDatabase')(dBaseConfigFile);

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
if(app.get('env') === 'production') sessionConfig.cookie.secure = true;
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

// Routes setup
app.get('/', (req, res) => res.render('welcome'));
app.use('/api', router);

app.listen(listenPort, console.log(`Server started on port ${listenPort}`));
