const homePage = (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Project Assignment: Simple REST API</title>
      <style>
        body {
         font-family: "Times New Roman", serif;
          margin: 2rem;
          text-align:center;
          line-height: 1.6;
          background: #f9f9f9;
        }
        h1 {
          color: #333;
        }
        button {
        text-align:left;
         font-family: "Times New Roman", serif;

          background-color: #c300ffff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          margin: 0.5rem 0;
          border-radius: 4px;
          font-size: 1rem;
        }
        button:hover {
          background-color: #a700b3ff;
        }
        .section-content {
        max-width:1500px;
          display: none;
          text-align:left;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: white;
          border-radius: 5px;
          box-shadow: 0 0 6px rgba(0,0,0,0.1);
          white-space: pre-wrap;
         font-family: "Times New Roman", serif;
        }
      </style>
    </head>
    <body>
      <h1>Project Assignment: Simple REST API</h1>
      
      <button onclick="toggleSection('overview')"> Overview</button>
      <div id="overview" class="section-content">
<h1>Project Assignment: Simple REST API</h1>
<p>Build a simple REST API using Node.js with Express for the back-end. This project will help you demonstrate your understanding of key concepts in backend development.
      </p></div>
      
      
      <button onclick="toggleSection('requirements')"> Requirements</button>
      <div id="requirements" class="section-content">
<h1>Requirements:</h1>
<strong>REST API (Node.js with Express)</strong>
1. Project Setup and Initialization:
a. Proper initialization of the Node.js project (e.g., package.json created using npm init).
b. Express installed and set up correctly.
c. Firebase project initialized, configured and connected to the database.
d. Clear and organized file structure (e.g., routes/, controllers/, config/, etc.)
e. Environment variables managed securely using .env for sensitive information (e.g., Firebase credentials).
      </div>

      <button onclick="toggleSection('endpoints')"> API Endpoints</button>
      <div id="endpoints" class="section-content">
<h1>2. API Endpoints:</h1>
a. GET /: A brief description of the REST API and Available Endpoints

<strong>Users Endpoints</strong>
a. GET /users - Retrieve all users.
b. POST /users - Add a new user.
c. PUT /users/:id - Update an existing user by ID.
d. DELETE /users/:id - Delete a user by ID.

<strong>Expense Endpoints</strong>
a. GET /expenses - Retrieve all expenses.
b. POST /expenses - Add a new expense.
c. PUT /expenses/:id - Update an existing expense by ID.
d. DELETE /expenses/:id - Delete an expense by ID.

<strong>Income Endpoints</strong>
a. GET /income - Retrieve all income.
b. POST /income - Add a new income.
c. PUT /income/:id - Update an existing income by ID.
d. DELETE /income/:id - Delete an income by ID.
      </div>

      <button onclick="toggleSection('errorHandling')"> Error Handling</button>
      <div id="errorHandling" class="section-content">
<h1>3. Error Handling:</h1>
a. Proper error handling for database errors, invalid IDs, or other edge cases.
b. Consistent response structure for errors and successful requests.
      </div>

      <button onclick="toggleSection('deliverables')"> Deliverables</button>
      <div id="deliverables" class="section-content">
<h1>Deliverables:</h1>
<li> Source code for the project.</li>
<li> A README file with instructions on how to run the application locally.</li>
     </div>

      <button onclick="toggleSection('grading')"> Evaluation Criteria & Grading</button>
      <div id="grading" class="section-content">
<h1>Evaluation Criteria:</h1>
<li> Functionality: Does the application meet all the requirements?</li>
<li> Code Quality: Is the code well-organized and easy to understand?</li>
<li> Documentation: Is the README file clear and comprehensive?</li>
    </div>

      <button onclick="toggleSection('functionality')"> Functionality </button>
<div id="functionality" class="section-content">
<h1>1. Functionality </h1>

<strong>Adding Users, Expenses, Income :</strong>
      <li>Fully functional endpoints to add each item.</li>
      <li>Proper error handling or successful response.</li>

<strong>Read Users, Expenses, Income :</strong>
      <li>All items are displayed correctly with the use of GET.</li>
      <li>Proper error handling or successful response.</li>

<strong>Edit Users, Expenses, Income :</strong>
      <li>Users can edit all items.</li>
      <li>Visual indication of edited item.</li>

  <strong>Deleting Users, Expenses, Income :</strong>
      <li>Users can delete any items.</li>
      <li>Items are removed immediately after deletion.</li>


</div>





<button onclick="toggleSection('sampleData')"> Sample Data</button>
<div id="sampleData"  class="section-content">
<h1> A sample data for users, income and expense:<h1>
<h2> Users:</h2>
  <img src="/images/UsersData.png" alt="Users Data" style="max-width:100%; height:auto; margin-bottom:1rem;" />


<h2>Income:</h2>
  <img src="/images/IncomeData.png" alt="Income Data" style="max-width:100%; height:auto; margin-bottom:1rem;" />



<h2>Expenses:</h2>
  <img src="/images/ExpensesData.png" alt="Expenses Data" style="max-width:100%; height:auto; margin-bottom:1rem;" />


</div>


      <script>
        function toggleSection(id) {
          const el = document.getElementById(id);
          if (el.style.display === 'block') {
            el.style.display = 'none';
          } else {
            el.style.display = 'block';
          }
        }
      </script>
        <img src="/images/RawanAbdellatif.png" alt="Rawan's Logo" style="max-width:100%; height:auto; margin-bottom:1rem;" />

    </body>
    </html>
  `);
};

module.exports = homePage;
