const { db } = require('../../config/firebaseAdmin');

// DELETE income by ID (hard delete)
const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;

    // Reference to the specific income record
    const incomeRef = db.ref(`income/${incomeId}`);

    // Check if income exists
    const snapshot = await incomeRef.once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: 'Income record not found' });
    }

    // Remove the income record
    await incomeRef.remove();

    res.status(200).json({ success: true, message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ success: false, error: 'Failed to delete income' });
  }
};

module.exports = deleteIncome;
