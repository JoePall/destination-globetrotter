// Checking if a user is logged in.
module.exports = (req, res, next) => (req.user) ? next() : res.redirect("/");
