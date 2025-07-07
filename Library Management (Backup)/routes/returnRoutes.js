const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
const auth = require("../middleware/auth");
const{ allowAdminAndLibrarian } = require('../middleware/roleAuth');


router.get('/',auth, allowAdminAndLibrarian,returnController.getReturns);
router.post('/return',auth, returnController.returnBook);

module.exports = router;
