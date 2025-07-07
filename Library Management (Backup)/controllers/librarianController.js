


const db = require('../config/db');


exports.getLibrarianDashboard =async (req, res) => {
  const username = req.user.username || "Librarian"; // Default to "Librarian" if not provided
  
   try {
    // 1. Get currently issued books
    const [currentIssuedBooks] = await db.execute(`
      SELECT DISTINCT b.title AS book_title, m.name AS member_name, ib.issue_date
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.book_id
      JOIN members m ON ib.member_id = m.id
      WHERE ib.status = 'Issued'
    `);

    // 2. Get low stock books (<= 2 available copies)
    const [lowStockBooks] = await db.execute(`
      SELECT title AS book_title, available_copies 
      FROM books 
      WHERE available_copies <= 2
    `);

    res.render('librarian_dashboard', {
      username,
      currentIssuedBooks,
      lowStockBooks
    });

  } catch (err) {
    console.error('Librarian Dashboard Error:', err);
    res.status(500).send('Error loading dashboard');
  }
  
    
};

