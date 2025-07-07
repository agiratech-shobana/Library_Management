const Book = require('../models/bookModel');
exports.getBooks = async (req, res) => {
  
  const role = req.user.role; // Assuming role is stored in user object
  try {
    const [books] = await Book.getAllBooks();//fetch all records from the db
    res.render('books', { books ,role}); //pass data to the view
  } catch (err) {
    console.error('Error loading books:', err);
    res.status(500).send('Server Error');
  }
};


exports.addBook = async (req, res) => {//reads the data from the add forms
  const { title, author, isbn, publisher, total_copies, available_copies } = req.body;
  try {
      const available_copies=total_copies;

    await Book.addBook({ title, author, isbn, publisher, total_copies, available_copies });
    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).send('Server Error');
  }
};

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publisher, total_copies, available_copies } = req.body;
  try {
    await Book.updateBook(id, { title, author, isbn, publisher, total_copies, available_copies });
    res.redirect('/books');
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).send('Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteBook(id);
    res.redirect('/books');
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).send('Server Error');
  }
};
