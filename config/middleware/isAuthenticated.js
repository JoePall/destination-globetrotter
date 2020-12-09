module.exports = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(500).send("No user found");
};
