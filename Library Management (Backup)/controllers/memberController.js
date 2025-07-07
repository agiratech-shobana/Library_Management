const Member = require('../models/memberModel');
const  nodemailer = require('nodemailer');

// GET all members
exports.getMembers = async (req, res) => {
  try {
    const role = req.user.role; // Assuming role is stored in user object
    const [members] = await Member.getAllMembers();
    res.render('members', { members ,role});
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).send('Server Error');
  }
};

// ADD member
exports.addMember = async (req, res) => {
  const { name, email, phone, membership_id, status } = req.body;
  
  try {
   
    await Member.addMember({ name, email, phone, membership_id, status });
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: '"librarymail@gmail.com"',
      to: email,
      subject: 'Member Registration',
       html: `
      <h3>Hi ${name},</h3>
      <p>Welcome to our Library!</p>
      <p>Your Membership ID: <strong>${membership_id}</strong></p>
      <p>You can now get and return book by using this Id.</p>
      <br>
      <p>Regards,<br>Library Admin</p>
    `
      
    });
    
    res.redirect('/members');
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).send('Server Error');
  }
};

// EDIT member
exports.editMember = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, membership_id, status } = req.body;
  try {
    await Member.updateMember(id, { name, email, phone, membership_id, status });
    res.redirect('/members');
  } catch (err) {
    console.error('Error editing member:', err);
    res.status(500).send('Server Error');
  }
};

// DELETE member
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await Member.deleteMember(id);
    res.redirect('/members');
  } catch (err) {
    console.error('Error deleting member:', err);
    res.status(500).send('Server Error');
  }
};
