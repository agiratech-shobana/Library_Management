const db = require('../config/db');

exports.getReportsPage = async (req, res) => {
  try {
    const role=req.user.role; // Assuming role is stored in user object
    // Issued Books
    const [issueReport] = await db.execute(`
      SELECT b.title, m.name, i.issue_date, i.due_date
      FROM issued_books i
      JOIN books b ON i.book_id = b.book_id
      JOIN members m ON i.member_id = m.id
    `);

    // Returned Books
    const [returnReport] = await db.execute(`
      SELECT b.title, m.name, r.return_date, r.fine_amount
      FROM returned_books r
      JOIN issued_books i ON r.issue_id = i.issue_id
      JOIN books b ON i.book_id = b.book_id
      JOIN members m ON i.member_id = m.id
    `);

    // Fine Summary
    const [fineSummary] = await db.execute(`
      SELECT m.name, SUM(r.fine_amount) as total_fine
      FROM returned_books r
      JOIN issued_books i ON r.issue_id = i.issue_id
      JOIN members m ON i.member_id = m.id
      GROUP BY m.id
    `);

    // Returned Today Count
    const [returnedTodayResult] = await db.execute(`
      SELECT COUNT(*) as returnedToday
      FROM returned_books
      WHERE DATE(return_date) = CURDATE()
    `);
    const returnedToday = returnedTodayResult[0].returnedToday;

    // Render the page
    res.render('reports', {
      issueReport,
      returnReport,
      fineSummary,
      returnedToday,role
    });

  } catch (err) {
    console.error('Error generating reports:', err);
    res.status(500).send('Internal Server Error');
  }
};
