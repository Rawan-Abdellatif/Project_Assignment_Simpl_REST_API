const { db } = require('../../config/firebaseAdmin');

const putExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updatedSections = req.body;

    // Reference to the expense
    const expenseRef = db.ref(`expenses/${expenseId}`);

    // Get current data
    const snapshot = await expenseRef.once('value');
    const existingData = snapshot.val();

    if (!existingData) {
      return res.status(404).json({
        success: false,
        error: `No expense found with ID ${expenseId}`
      });
    }

    // Expected structure (schema)
    const expectedSchema = {
      Savings: ["RRSP", "Investment Savings", "Long-term savings", "Bonds", "Others"],
      "Payment Obligations": ["credit card", "Loan", "vehicle lease", "Line of credit"],
      Insurance: ["life insurance", "health insurance", "others"],
      Housing: ["Rent", "rent insurance", "storage and parking", "utilities", "maintainance"],
      Utilities: ["phone", "Internet", "water", "Heat", "Electricity", "Cable", "others"],
      Personal: ["transportation", "clothing", "gifts - family", "Personal grooming", "dining out", "Hobbies", "others"]
    };

    const editedFields = [];

    // Loop through each category
    for (const [category, keys] of Object.entries(expectedSchema)) {
      const updatedCategory = updatedSections[category];
      const existingCategory = existingData[category];

      // If category does not exist in request, skip it
      if (!updatedCategory || typeof updatedCategory !== 'object') continue;

      // Loop through each expected field in the category
      for (const key of keys) {
        if (updatedCategory.hasOwnProperty(key)) {
          const newValue = updatedCategory[key];

          // Validate the value
          if (
            newValue === undefined ||
            newValue === null ||
            newValue === '' ||
            (typeof newValue === 'number' && newValue <= 0)
          ) {
            return res.status(400).json({
              success: false,
              error: `Invalid value for "${key}" in "${category}"`
            });
          }

          const oldValue = existingCategory?.[key];

          // Only add to edited if changed
          if (newValue !== oldValue) {
            editedFields.push(`${category} -> ${key}`);
            // Apply the update
            existingCategory[key] = newValue;
          }
        }
      }
    }

    // Write the updated data back to the database
    await expenseRef.set(existingData);

    // Send the response
    return res.status(200).json({
      success: true,
      message: editedFields.length
        ? editedFields.map(field => `Edited ${field} successfully`).join(' & ')
        : 'No changes detected but update completed.'
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

module.exports = putExpense;
