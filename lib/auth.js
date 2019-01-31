module.exports = {
    ensureAuth(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Access restricted. Please log in');
        return res.redirect('/api/v1/users/login');
    }
};