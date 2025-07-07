const Issue = require('../models/issueModel');
const db = require('../config/db');

exports.getIssuedBooks = async (req, res) => {
  const role=req.user.role; // Assuming role is stored in user object
  try {
    const [issued_books] = await Issue.getAllIssuedBooks();
    const [members] = await db.execute('SELECT * FROM members');
    const [books] = await db.execute('SELECT book_id, title FROM books WHERE available_copies > 0');
    res.render('issued_books', { issued_books, members, books,role });
  } catch (err) {
    console.error('Error getting issued books:', err);
    res.status(500).send('Server Error');
  }
};

exports.postIssueBook = async (req, res) => {
  const { member_id, book_id, issue_date, due_date } = req.body;
  try {
    await Issue.issueBook({ member_id, book_id, issue_date, due_date });
    await db.execute(`UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?`, [book_id]);
    res.redirect('/issue');
  } catch (err) {
    console.error('Error issuing book:', err);
    res.status(500).send('Server Error');
  }
};

exports.postEditIssue = async (req, res) => {
  const { id } = req.params;
  const { due_date, status } = req.body;
  try {
    await Issue.updateIssuedBook(id, { due_date, status });
    res.redirect('/issue');
  } catch (err) {
    console.error('Error editing issue:', err);
    res.status(500).send('Server Error');
  }
};

exports.postDeleteIssue = async (req, res) => {
  const { id } = req.params;
  try {
    await Issue.deleteIssuedBook(id);
    res.redirect('/issue');
  } catch (err) {
    console.error('Error deleting issue:', err);
    res.status(500).send('Server Error');
  }
};
