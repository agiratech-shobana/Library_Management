const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const{ allowAdminAndLibrarian } = require('../middleware/roleAuth');
const auth=require("../middleware/auth");
router.get('/reports', auth,allowAdminAndLibrarian,reportController.getReportsPage);
module.exports = router;
