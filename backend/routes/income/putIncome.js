const { db } = require('../../config/firebaseAdmin');

// PUT income by ID
const putIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const newData = req.body;

    // Reference to the specific income record
    const incomeRef = db.ref(`income/${incomeId}`);

    // Get current income data
    const snapshot = await incomeRef.once('value');
    const existingData = snapshot.val();

    if (!existingData) {
      return res.status(404).json({ success: false, message: 'Income record not found' });
    }

    const updates = {};
    const updateMessages = [];

    // Compare each field and collect updates
    for (const key of ['wages', 'secondaryIncome', 'interest', 'supportPayment', 'others']) {
      if (
        newData[key] !== undefined && 
        newData[key] !== existingData[key]
      ) {
        updates[key] = newData[key];
        const label = key
        // Add space before capital letters
          .replace(/([A-Z])/g, ' $1')    
          // Capitalize first letter
          .replace(/^./, str => str.toUpperCase()); 
        updateMessages.push(`${label} updated to ${newData[key]}`);
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(200).json({ success: true, message: 'Income already up to date' });
    }

    // Apply the updates in Firebase
    await incomeRef.update(updates);

    res.status(200).json({
      success: true,
      message: updateMessages.join(', ')
    });
    
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ success: false, error: 'Failed to update income' });
  }
};

module.exports = putIncome;
