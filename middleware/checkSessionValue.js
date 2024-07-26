function checkSessionValue(req, res, next) {
  if (req.session.value === "foo") {
    return next();
  }
  // res.sendStatus(401);
  res.status(401).send("Hint: set the session value to 'foo' ...");
}

module.exports = checkSessionValue;
