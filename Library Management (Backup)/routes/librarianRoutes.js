const express = require("express");
const router = express.Router();
const librarianController = require("../controllers/librarianController");
const auth = require("../middleware/auth");
// Route to render the librarian dashboard
router.get("/dashboard", auth, librarianController.getLibrarianDashboard);

module.exports = router;
