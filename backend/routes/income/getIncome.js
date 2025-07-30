 const { db } = require('../../config/firebaseAdmin');



const getIncome = async (req, res) => {
  try {
    // Get a reference to the "income" collection in the database
    const incomeRef = db.ref('income');

    // Fetch the data snapshot from the database
    const snapshot = await incomeRef.once('value');

    // Extract data from the snapshot
    const incomeData = snapshot.val();

    // If no income records found, return an empty array
    if (!incomeData) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Convert the income object into an array of income entries
    const incomeList = Object.values(incomeData);

    // Send successful response with income list
    res.status(200).json({
      success: true,
      data: incomeList
    });

  } catch (error) {
    // Log and return error response in case of failure
    console.error('Error fetching income:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve income records.' });
  }
};

// Export the controller function
module.exports = getIncome;