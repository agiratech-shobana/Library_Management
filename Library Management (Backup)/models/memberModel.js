const db = require('../config/db');

// Get all members
exports.getAllMembers = () => {
  return db.execute('SELECT * FROM members');
};

// Add new member
exports.addMember = (member) => {
  return db.execute(
    'INSERT INTO members (name, email, phone, membership_id, status) VALUES (?, ?, ?, ?, ?)',
    [member.name, member.email, member.phone, member.membership_id, member.status]
  );
};

// Update member
exports.updateMember = (id, member) => {
  return db.execute(
    'UPDATE members SET name = ?, email = ?, phone = ?, membership_id = ?, status = ? WHERE id = ?',
    [member.name, member.email, member.phone, member.membership_id, member.status, id]
  );
};

// Delete member
exports.deleteMember = (id) => {
  return db.execute('DELETE FROM members WHERE id = ?', [id]);
};
