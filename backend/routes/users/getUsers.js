const { db } = require('../../config/firebaseAdmin');

// GET all users
const getUsers = async (req, res) => {
  try {
    // Access the 'users' node from the database
    const snapshot = await db.ref('users').once('value');

    // Get the actual data from the snapshot
    const users = snapshot.val();

    // If no users are found, return 404 with a message
    if (!users) {
      return res.status(404).json({ success: false, message: 'No users found.' });
    }



    // Return the raw users object 
res.status(200).json(users);

  } catch (error) {
    // Handle unexpected errors and log them
    console.error('Error fetching users:', error);

    // Return a 500 Internal Server Error with a message
    res.status(500).json({ success: false, error: 'Failed to retrieve users.' });
  }
};

module.exports = getUsers;
