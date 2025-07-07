const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const auth = require("../middleware/auth");
const{ allowAdminAndLibrarian } = require('../middleware/roleAuth');

// Route: GET all members
router.get('/', auth,allowAdminAndLibrarian,memberController.getMembers);

// Route: POST add member
router.post('/add',auth, memberController.addMember);

// Route: POST edit member
router.post('/edit/:id', auth,memberController.editMember);

// Route: POST delete member
router.post('/delete/:id',auth, memberController.deleteMember);

module.exports = router;
