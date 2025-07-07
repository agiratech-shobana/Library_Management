const bcrypt = require('bcryptjs');

const password = 'lib123'; // plain text password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hashedPassword);
  }
});