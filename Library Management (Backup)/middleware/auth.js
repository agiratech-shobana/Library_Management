const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token; //tries to extract token from cookie
  if (!token) return res.redirect("/");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.redirect("/");
    req.user = user;
    next();
  });
};

