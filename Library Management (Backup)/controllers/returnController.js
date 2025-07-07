const Return = require('../models/returnModel');

exports.getReturns = async (req, res) => {
  try {
    const role = req.user.role; // Assuming role is stored in user object
    const [returnedBooks] = await Return.getAllReturnedBooks();
    const [pendingIssues] = await Return.getPendingIssues();
    res.render('return_books', { returnedBooks, pendingIssues,role });
  } catch (err) {
    console.error('Error loading return books:', err);
    res.status(500).send('Server Error');
  }
};

exports.returnBook = async (req, res) => {
  const { issue_id, return_date } = req.body;

  try {
    const [issues] = await Return.getPendingIssues();
    const issue = issues.find(i => i.issue_id == issue_id);

    let fine = 0;
    const due = new Date(issue.due_date);
    const ret = new Date(return_date);

    const delay = Math.ceil((ret - due) / (1000 * 60 * 60 * 24));
    if (delay > 0) {//subract the days from the due date and divide by milliseconds to get the difference in days
      fine = delay * 5;
    }

    await Return.markAsReturned({ issue_id, return_date, fine_amount: fine });
    await Return.updateIssueStatus(issue_id);
    
    res.redirect('/returns');
  } catch (err) {
    console.error('Error returning book:', err);
    res.status(500).send('Server Error');
  }
};
