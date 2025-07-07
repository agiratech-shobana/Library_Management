const db = require("../config/db");
const bcrypt = require('bcrypt');



exports.getAdminDashboard = async (req, res) => {
  try {
    const username = req.user.username || "Admin";
    const role=req.user.role;

    // Dashboard queries
    const [totalBooksResult] = await db.query('SELECT COUNT(*) AS count FROM books');
    const [booksIssuedToday] = await db.query('SELECT COUNT(*) AS count FROM issued_books WHERE DATE(issue_date) = CURDATE()');
    const [booksReturnedToday] = await db.query('SELECT COUNT(*) AS count FROM returned_books WHERE DATE(return_date) = CURDATE()');
    const [totalMembers] = await db.query('SELECT COUNT(*) AS count FROM members');
    const [overdueBooks] = await db.query('SELECT COUNT(*) AS count FROM issued_books WHERE due_date < CURDATE() AND status = "Issued"');
    const [finesToday] = await db.query('SELECT SUM(fine_amount) AS total FROM returned_books WHERE DATE(return_date) = CURDATE()');

    const stats = {
      totalBooks: totalBooksResult[0].count,
      booksIssuedToday: booksIssuedToday[0].count,
      booksReturnedToday: booksReturnedToday[0].count,
      totalMembers: totalMembers[0].count,
      overdueBooks: overdueBooks[0].count,
      finesCollectedToday: finesToday[0].total || 0
    };

    res.render("dashboard", { username, stats,role });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).send("Error loading dashboard");
  }
};

exports.registerLibrarian = async (req, res) => {
  const { name, email, password, address, number } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    // const query = `INSERT INTO librarian (name, email, password, address, number) VALUES (?, ?, ?, ?, ?)`;
    // await db.execute(query, [name, email, hashedPassword, address, number]);

    await db.execute(
  'INSERT INTO librarian (name, email, password, address, number) VALUES (?, ?, ?, ?, ?)',
  [name, email, hashedPassword, address, number]
);

    res.redirect('/admin/dashboard'); // or show success
  } catch (err) {
    console.error('Librarian Registration Error:', err);
    res.status(500).send('Failed to register librarian');
  }
};


exports.getReportsPage = async (req, res) => {
  try {
    res.render('reports', { stats: null }); // initially no data
  } catch (err) {
    console.error('Error loading reports page:', err);
    res.status(500).send('Error loading reports');
  }
};

