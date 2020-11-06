// Middleware for restricting routes a user has access to if not logged in

module.exports = function(req, res, next) {
    if (req.user) {
        return next();
    }
    return res.redirect("/");
};