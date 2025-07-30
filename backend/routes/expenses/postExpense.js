const { db } = require('../../config/firebaseAdmin');

const postExpense  = async (req, res) => {
  try {
    const expenseSections = req.body;

    // Define expected Details: keys for each category
    const expectedDetails = {
      Savings: ["RRSP", "Investment Savings", "Long-term savings", "Bonds", "Others"],
      "Payment Obligations": ["credit card", "Loan", "vehicle lease", "Line of credit"],
      Insurance: ["life insurance", "health insurance", "others"],
      Housing: ["Rent", "rent insurance", "storage and parking", "utilities", "maintainance"],
      Utilities: ["phone", "Internet", "water", "Heat", "Electricity", "Cable", "others"],
      Personal: ["transportation", "clothing", "gifts - family", "Personal grooming", "dining out", "Hobbies", "others"]
    };

    const missingFields = [];

    // Iterate over each category and expected keys
    for (const [category, keys] of Object.entries(expectedDetails)) {
      const categoryData = expenseSections[category];

      if (!categoryData || typeof categoryData !== 'object') {
        missingFields.push(`Category "${category}" is missing or invalid`);
        continue;
      }

      // Check each expected key inside the category
      for (const key of keys) {
        const value = categoryData[key];

        // Check if missing or invalid (undefined, null, empty string, or number <= 0)
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          (typeof value === 'number' && value <= 0)
        ) {
          missingFields.push(`Missing or invalid value for "${key}" in "${category}"`);
        }
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `These fields are missing or invalid: ${missingFields.join(', ')}`
      });
    }

    // Generate new expense ID
    const newExpenseRef = db.ref('expenses').push();

    const expenseData = {
      id: newExpenseRef.key,
      ...expenseSections
    };

    await newExpenseRef.set(expenseData);

    return res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: expenseData
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

module.exports = postExpense ;
