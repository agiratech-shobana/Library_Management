const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require("../middleware/auth");

const{ allowAdminAndLibrarian } = require('../middleware/roleAuth');


// Ensure these are functions defined in bookController.js
router.get('/', auth,allowAdminAndLibrarian,bookController.getBooks);
router.post('/add',auth, bookController.addBook);
router.post('/edit/:id',auth, bookController.editBook);
router.post('/delete/:id', auth,bookController.deleteBook);
module.exports = router;