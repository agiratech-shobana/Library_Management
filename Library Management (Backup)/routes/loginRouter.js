const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

// Route to render the login page
router.get("/", loginController.getLogin);
router.post("/login", loginController.postLogin);
router.get("/logout", loginController.logout);
module.exports = router;
