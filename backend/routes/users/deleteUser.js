const { db } = require('../../config/firebaseAdmin');

// DELETE /users/:id - Delete a user completely from Firebase
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Reference to the user
    const userRef = db.ref(`users/${userId}`);

    // Check if user exists
    const snapshot = await userRef.once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the user completely
    await userRef.remove();

    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

module.exports = deleteUser;
