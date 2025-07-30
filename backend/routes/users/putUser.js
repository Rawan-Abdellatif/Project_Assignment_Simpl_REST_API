const { db } = require('../../config/firebaseAdmin');

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    // Check if user exists
    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const currentUser = snapshot.val();
    const { id, username, name, email, address } = req.body;

    // Validate ID 
    if (id && id !== userId) {
      return res.status(400).json({ success: false, error: "ID in body must match URL parameter or be omitted." });
    }

    // Validate username
    if (!username || typeof username !== 'string' || username.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Username must be at least 2 characters." });
    }

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Name must be at least 2 characters." });
    }

    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Valid email is required." });
    }

    // Validate address
    if (
      !address ||
      typeof address !== 'object' ||
      typeof address.street !== 'string' || address.street.trim().length < 3 ||
      typeof address.suite !== 'string' || address.suite.trim().length < 1 ||
      typeof address.city !== 'string' || address.city.trim().length < 2 ||
      typeof address.zipcode !== 'string' || address.zipcode.trim().length < 3
    ) {
      return res.status(400).json({ success: false, error: "Complete valid address is required." });
    }

    // Check if no changes were made
    const isSameData =
      currentUser.username === username.trim() &&
      currentUser.name === name.trim() &&
      currentUser.email === email.trim() &&
      currentUser.address.street === address.street.trim() &&
      currentUser.address.suite === address.suite.trim() &&
      currentUser.address.city === address.city.trim() &&
      currentUser.address.zipcode === address.zipcode.trim();

      // check if the user already Up to date
    if (isSameData) {
      return res.status(200).json({ success: true, message: "User already up to date." });
    }

    const updatedUser = {
      id: userId,
      username: username.trim(),
      name: name.trim(),
      email: email.trim(),
      address: {
        street: address.street.trim(),
        suite: address.suite.trim(),
        city: address.city.trim(),
        zipcode: address.zipcode.trim(),
      }
    };

    await userRef.set(updatedUser);

    res.status(200).json({ success: true, message: "User updated successfully.", updatedUser });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Failed to update user." });
  }
};

module.exports = updateUser;
