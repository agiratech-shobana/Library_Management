const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

// Route to render the admin dashboard
router.get("/dashboard", auth, adminController.getAdminDashboard);

router.post("/register-librarian", auth, adminController.registerLibrarian);

router.get('/reports', adminController.getReportsPage);
// router.post("/register-librarian", auth, adminController.postRegisterLibrarian);
module.exports = router;
