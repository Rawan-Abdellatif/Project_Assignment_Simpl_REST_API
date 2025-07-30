const { db } = require('../../config/firebaseAdmin');

const deleteExpense = async (req, res) => {
  try {
    // Get the expense ID from request parameters
    const expenseId = req.params.id;

    // Create a reference to the specific expense in Firebase
    const expenseRef = db.ref(`expenses/${expenseId}`);

    // Check if the expense exists before deleting
    const snapshot = await expenseRef.once('value');
    const existingExpense = snapshot.val();

    // If expense doesn't exist, return 404 with message
    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: `Expense with ID ${expenseId} is already deleted or does not exist.`
      });
    }

    //  Remove the expense from Firebase Realtime Database
    await expenseRef.remove();

    // Send success response after deletion
    return res.status(200).json({
      success: true,
      message: `Expense with ID ${expenseId} deleted successfully.`
    });
  } catch (error) {
    // Handle any server errors
    console.error('Error deleting expense:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

module.exports = deleteExpense;
