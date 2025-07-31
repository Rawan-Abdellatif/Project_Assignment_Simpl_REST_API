const express = require('express');
const { admin, db } = require('./config/firebaseAdmin');

const app = express();
const PORT = 4000;

// Make public folder accessible in browser
app.use(express.static('public'));

// Import Home handler
const homePage = require("./routes/home/homePage");

// Import Users handlers
const getUsers = require("./routes/users/getUsers");
const postUser = require("./routes/users/postUser");
const putUser = require("./routes/users/putUser");
const deleteUser = require("./routes/users/deleteUser");

// Import Expenses handlers
const getExpenses = require("./routes/expenses/getExpenses");
const postExpense = require("./routes/expenses/postExpense");
const putExpense = require("./routes/expenses/putExpense");
const deleteExpense = require("./routes/expenses/deleteExpense");

// Import Income handlers
const getIncome = require("./routes/income/getIncome");
const postIncome = require("./routes/income/postIncome");
const putIncome = require("./routes/income/putIncome");
const deleteIncome = require("./routes/income/deleteIncome");

app.use(express.json());


///// Homepage routes
app.get('/', homePage);


// Users routes
app.get("/users", getUsers);
app.post("/users", postUser);
app.put("/users/:id", putUser);
app.delete("/users/:id", deleteUser);

// Income routes
app.get("/income", getIncome);
app.post("/income", postIncome);
app.put("/income/:id", putIncome);
app.delete("/income/:id", deleteIncome);

// Expenses routes
app.get("/expenses", getExpenses);
app.post("/expenses", postExpense);
app.put("/expenses/:id", putExpense);
app.delete("/expenses/:id", deleteExpense);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
