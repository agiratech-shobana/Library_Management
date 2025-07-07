// models/reportModel.js
const db = require('../config/db');

module.exports = {
  getIssuedToday: async () => {
    const [rows] = await db.execute(`SELECT COUNT(*) AS count FROM issued_books WHERE DATE(issue_date) = CURDATE()`);
    return rows[0].count;
  },

  getReturnedToday: async () => {
    const [rows] = await db.execute(`SELECT COUNT(*) AS count FROM returned_books WHERE DATE(return_date) = CURDATE()`);
    return rows[0].count;
  },

  getFineCollectedToday: async () => {
    const [rows] = await db.execute(`SELECT SUM(fine_amount) AS total FROM returned_books WHERE DATE(return_date) = CURDATE()`);
    return rows[0].total || 0;
  },

  getIssuedBooks: async () => {
    const [rows] = await db.execute(`SELECT * FROM issued_books`);
    return rows;
  },

  getReturnedBooks: async () => {
    const [rows] = await db.execute(`SELECT * FROM returned_books`);
    return rows;
  },

  getOverdueBooks: async () => {
    const [rows] = await db.execute(`SELECT * FROM issued_books WHERE due_date < CURDATE() AND status != 'Returned'`);
    return rows;
  },

 
  getMemberActivity: async () => {
    const [rows] = await db.execute(`
      SELECT member_name, COUNT(*) AS issued_count 
      FROM issued_books GROUP BY member_name
    `);
    return rows;
  }
};
