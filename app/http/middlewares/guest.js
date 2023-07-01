function guest(req, res, next) {
  // if user is not loged in
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/");
}

module.exports = guest;
