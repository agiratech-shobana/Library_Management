const db = require('../config/db');

exports.getAllIssuedBooks = () => {
  return db.execute(`
    SELECT ib.*, m.name AS member_name, b.title AS book_title
    FROM issued_books ib
    JOIN members m ON ib.member_id = m.id
    JOIN books b ON ib.book_id = b.book_id
    ORDER BY ib.issue_date DESC
  `);
};

exports.issueBook = ({ member_id, book_id, issue_date, due_date }) => {
  return db.execute(`
    INSERT INTO issued_books (member_id, book_id, issue_date, due_date)
    VALUES (?, ?, ?, ?)
  `, [member_id, book_id, issue_date, due_date]);
};

exports.updateIssuedBook = (id, { due_date, status }) => {
  return db.execute(`
    UPDATE issued_books SET due_date = ?, status = ? WHERE issue_id = ?
  `, [due_date, status, id]);
};

exports.deleteIssuedBook = (id) => {
  return db.execute(`DELETE FROM issued_books WHERE issue_id = ?`, [id]);
};
