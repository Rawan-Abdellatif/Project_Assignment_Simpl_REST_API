
 const { db } = require('../../config/firebaseAdmin');

// Import UUID to generate unique IDs for each income entry
const { v4: uuidv4 } = require('uuid');

// Controller function to handle POST /income
const postIncome = async (req, res) => {
  try {
    // Destructure income fields from the request body
    const {
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others
    } = req.body;

    // Validate that all fields are present and numeric
    if (
      wages == null || isNaN(wages) ||
      secondaryIncome == null || isNaN(secondaryIncome) ||
      interest == null || isNaN(interest) ||
      supportPayment == null || isNaN(supportPayment) ||
      others == null || isNaN(others)
    ) {
      // Send a 400 Bad Request if validation fails
      return res.status(400).json({ success: false, error: 'All fields must be valid numbers.' });
    }

    // Generate a unique ID for the income entry
    const id = uuidv4();

    // Create a new income object to store in the database
    const newIncome = {
      id,
      wages: Number(wages),
      secondaryIncome: Number(secondaryIncome),
      interest: Number(interest),
      supportPayment: Number(supportPayment),
      others: Number(others)
    };

    // Save the new income entry in the database under /income/{id}
    await db.ref(`income/${id}`).set(newIncome);

    // Respond with success and the saved income data
    res.status(201).json({
      success: true,
      message: 'Income added successfully.',
      data: newIncome
    });

  } catch (error) {
    // Catch and log unexpected errors
    console.error('Error adding income:', error);

    // Respond with a 500 Internal Server Error
    res.status(500).json({ success: false, error: 'Failed to add income.' });
  }
};

// Export the controller function
module.exports = postIncome;