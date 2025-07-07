// middleware/roleAuth.js
exports.allowAdminAndLibrarian = (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin' || role === 'librarian') {
    next(); // allow
  } else {
    // member or unknown role
    return res.status(403).send('Access denied. Members are not allowed here.');
  }
};
