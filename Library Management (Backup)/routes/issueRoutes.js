const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const auth = require("../middleware/auth");
const{ allowAdminAndLibrarian } = require('../middleware/roleAuth');


router.get('/', auth,allowAdminAndLibrarian,issueController.getIssuedBooks);
router.post('/add',auth, issueController.postIssueBook);
router.post('/edit/:id',auth, issueController.postEditIssue);
router.post('/delete/:id',auth, issueController.postDeleteIssue);

module.exports = router;
