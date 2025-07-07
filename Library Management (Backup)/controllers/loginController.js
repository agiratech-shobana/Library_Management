const { loginVerification } = require("../models/LoginModel");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
  const token = req.cookies.token; //extract token from cookie
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET); //if token exsits try to verify the token
      // Token is valid, redirect to dashboard
      return res.redirect("/admin/dashboard");
      
    } catch (err) {
      // Token invalid or expired, show login page
      return res.render("login", { error: "" });
    }
  }
  // No token, show login page
  res.render("login", { error: "" });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  try {
    const { token, username, role } = await loginVerification(email, password); // Call the login verification function
    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      }); // Set the JWT token as a cookie
      if (role === "admin") {
        return res.redirect("/admin/dashboard");
      } else if (role === "librarian") {
        return res.redirect("/librarian/dashboard");
      }
    } 
    res.render("login", { error: "Invalid email or password" }); // Render login page with error message
  } catch (error) { //catch the internal error
    console.error("Login error:", error);
    res.render("login", { error: "An error occurred during login" }); // Handle errors gracefully
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token"); //deletes the jwt cookie
  // Set the logout flag in localStorage via a script
  res.send(`
    <script>
      localStorage.setItem('logout', Date.now());
      window.location.href = '/';
    </script>
  `); //logs out user from all the browser tabs by setting localstorage.logout
};
