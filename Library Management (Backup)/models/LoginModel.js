const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.loginVerification = async (email, password) => {
  try {
    // Check admin table
    const [adminResults] = await db.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );
    if (adminResults.length > 0) {
      const admin = adminResults[0];  //if admin found extract row
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign( //create a jwt token with id,email,role
          {
            id: admin.id,
            email: admin.email,
            username: admin.name,
            role: "admin",
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return { token, username: admin.name, role: "admin" };
      }
    }

    // Check librarian table
    const [librarianResults] = await db.query(
      "SELECT * FROM librarian WHERE email = ?",
      [email]
    ); // if not admin,search in librarian table
    console.log("Librarian results:", librarianResults);
    if (librarianResults.length > 0) {
      const librarian = librarianResults[0];
      console.log("entered password:",password);
      console.log("librarian password:", librarian.password);
      const isMatch = await bcrypt.compare(password, librarian.password);
      if (isMatch) {
        const token = jwt.sign(
          {
            id: librarian.id,
            email: librarian.email,
            username: librarian.name,
            role: "librarian",
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );console.log("Librarian token:", token);
        return { token, username: librarian.name, role: "librarian" };
      }
    }

    // No match found
    return { token: null, username: null, role: null };
  } catch (error) {
    throw error;
  }
};
