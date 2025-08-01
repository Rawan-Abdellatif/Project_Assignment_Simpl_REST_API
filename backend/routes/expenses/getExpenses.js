const { db } = require('../../config/firebaseAdmin');

const getExpenses = async (req, res) => {
  try {
    //Get a reference to the 'expenses' node in Firebase Realtime Database
    const snapshot = await db.ref('expenses').once('value');

    //Extract the data from the snapshot
    const data = snapshot.val();

    //If no expenses are found, return an empty object
    if (!data) {
      return res.status(200).json({
        success: true,
        message: 'No expenses found.',
        data: {}
      });
    }

    // Extract the first expense entry's [id, data]
const [firstId, firstExpense] = Object.entries(data)[0];

// Combine id with the expense data
const result = {
  id: firstId,
  ...firstExpense
};

// Return it
return res.status(200).json(
 result
);

    // Return the full data object (with expense IDs as keys)
    // return res.status(200).json({
    //   success: true,
    //   message: 'Expenses retrieved successfully.',
    //   data  
    // });
  } catch (error) {

    // If an error occurs, log it and return a 500 error response
    console.error('Error retrieving expenses:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

module.exports = getExpenses;
