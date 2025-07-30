const { db } = require('../../config/firebaseAdmin');

const postUser = async (req, res) => {
  try {
    const { name, username, email, address } = req.body;

    // Validate required fields
    if (!name || !username || !email) {
      return res.status(400).json({ success: false, error: "Name, username, and email are required." });
    }
    if (!address || typeof address !== 'object') {
      return res.status(400).json({ success: false, error: "Address must be an object." });
    }
    const { street, suite, city, zipcode } = address;
    if (!street || !suite || !city || !zipcode) {
      return res.status(400).json({ success: false, error: "All address fields are required." });
    }

    // Read all users once
    const snapshot = await db.ref("users").once("value");
    const users = snapshot.val() || {};

    // Check name
    const nameExists = Object.values(users).some(user => user.name === name);
    if (nameExists) {
      return res.status(409).json({ success: false, error: "Name already exists." });
    }

    //  Check username
    const usernameExists = Object.values(users).some(user => user.username === username);
    if (usernameExists) {
      return res.status(409).json({ success: false, error: "Username already exists." });
    }

    //  Check email
    const emailExists = Object.values(users).some(user => user.email === email);
    if (emailExists) {
      return res.status(409).json({ success: false, error: "Email already exists." });
    }

    //  Add new user
    const newUser = {
      name,
      username,
      email,
      address: { street, suite, city, zipcode }
    };

    const userRef = await db.ref("users").push(newUser);
    const generatedId = userRef.key;

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: { id: generatedId, ...newUser }
    });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, error: "Failed to add user" });
  }
};

module.exports = postUser;
