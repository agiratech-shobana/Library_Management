// // // controllers/bookController.js

// models/bookModel.js
const db = require('../config/db');

//  Get all books
exports.getAllBooks = async () => {
  const [rows] = await db.query('SELECT * FROM books');
  return [rows];
};

//  Add a new book
exports.addBook = async ({ title, author, isbn, publisher, total_copies, available_copies }) => {
  await db.query(
    'INSERT INTO books (title, author, isbn, publisher, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?)',
    [title, author, isbn, publisher, total_copies, available_copies]
  );
};

// Update a book
exports.updateBook = async (id, { title, author, isbn, publisher, total_copies, available_copies }) => {
  await db.query(
    'UPDATE books SET title = ?, author = ?, isbn = ?, publisher = ?, total_copies = ?, available_copies = ? WHERE book_id = ?',
    [title, author, isbn, publisher, total_copies, available_copies, id]
  );
};

//  Delete a book
exports.deleteBook = async (id) => {
  await db.query('DELETE FROM books WHERE book_id = ?', [id]);
};
