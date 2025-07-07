const db = require('../config/db');

// Get all returned books with joined issue, member, and book info
exports.getAllReturnedBooks = () => {
  return db.execute(`
    SELECT rb.*, 
           ib.issue_date, ib.due_date, 
           m.name AS member_name, 
           b.title AS book_title
    FROM returned_books rb
    JOIN issued_books ib ON rb.issue_id = ib.issue_id
    JOIN members m ON ib.member_id = m.id
    JOIN books b ON ib.book_id = b.book_id
    ORDER BY rb.return_date DESC
  `);
};

// Get list of issued books not yet returned
exports.getPendingIssues = () => {
  return db.execute(`
   SELECT ib.issue_id, b.title, m.name, ib.due_date
   FROM issued_books ib
   JOIN books b ON ib.book_id = b.book_id
  JOIN members m ON ib.member_id = m.id
   AND ib.status = 'Issued';
  `);
};

// Save returned book
exports.markAsReturned = ({ issue_id, return_date, fine_amount }) => {
  return db.execute(`
    INSERT INTO returned_books (issue_id, return_date, fine_amount, status)
    VALUES (?, ?, ?, 'Returned')
  `, [issue_id, return_date, fine_amount]);
};

// Update status of issued book to Returned
exports.updateIssueStatus = (issue_id) => {
  return db.execute(`
    UPDATE issued_books SET status = 'Returned' WHERE issue_id = ?
  `, [issue_id]);
};
