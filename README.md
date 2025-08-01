
# Project\_Assignment\_Simpl\_REST\_API

## Simple REST API – User Management with Node.js, Express & Firebase Realtime Database

This project is a beginner-friendly REST API built using **Node.js**, **Express**, and **Firebase Realtime Database**. It provides full **CRUD** functionality for managing users, income, and expenses, along with input validation and a static homepage served from the `public/` folder.

---

![HomePage](HomePage.png)

---

##  Features

### User Management

* Add a new user (POST)
* Retrieve all users (GET)
* Update user data by ID (PUT)
* Delete a user by ID (DELETE)



###  Income Management

* Add a new income entry
* Retrieve all income records
* Update income entry by ID
* Delete income entry by ID

###  Expenses Management

* Add a new expense entry
* Retrieve all expense records
* Update expense entry by ID
* Delete expense entry by ID

---
All data is stored in **Firebase Realtime Database**, with validation applied before saving.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) installed on your machine.

---

### 1. Install Dependencies

```bash
npm init -y                        # Initialize project
npm install express                # Web framework
npm install firebase-admin         # Firebase Admin SDK
npm install nodemon --save-dev     # Auto-reload during development
```

---

### 2. Firebase Admin SDK Setup

In the `config/` folder, create `firebaseAdmin.js`:

```js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com/`
});

const db = admin.database();

module.exports = { admin, db };
```

---

### 3. Running the Server

Start the server using:

```bash
npx nodemon index.js
```

Or update your `package.json`:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

Then run:

```bash
npm start
```

The server will be available at [http://localhost:4000](http://localhost:4000)

---

##  Project Structure

```
backend/
├── config/
│   ├── firebaseAdmin.js
│   └── serviceAccountKey.json         # Keep this file private
│
├── routes/
│   ├── home/
│   │   └── homePage.js
│   ├── users/
│   │   ├── getUsers.js
│   │   ├── postUser.js
│   │   ├── putUser.js
│   │   └── deleteUser.js
│   ├── income/
│   │   ├── getIncome.js
│   │   ├── postIncome.js
│   │   ├── putIncome.js
│   │   └── deleteIncome.js
│   └── expenses/
│       ├── getExpenses.js
│       ├── postExpenses.js
│       ├── putExpenses.js
│       └── deleteExpenses.js
│
├── public/
│   └── images/
│       ├── RawanAbdellatif.png
│       ├── ExpensesData.png
│       ├── IncomeData.png
│       └── UsersData.png
│
├── index.js
├── package.json
├── .gitignore
└── .env
```

---

##  Static Homepage

The app serves a simple homepage at:
[http://localhost:4000](http://localhost:4000)

Static files are served from the `public/` folder using:

```
app.use(express.static('public'));
```

You can add  images to the `public/` directory.

---

##  Input Validation

Validation ensures all required fields are provided:

* **Users:** `userName`, `name`, `email`
* **Income & Expenses:** `wages`, `saving`, `paymentObligation`, etc.

If fields are missing, the API responds with an error message.

---

## Testing the API

Use **Insomnia** or **Postman** to test the following endpoints:

---

### Users Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/users`     | Create a new user |
| GET    | `/users`     | Get all users     |
| PUT    | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

---

###  Income Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/income`     | Add new income record      |
| GET    | `/income`     | Get all income records     |
| PUT    | `/income/:id` | Update income record by ID |
| DELETE | `/income/:id` | Delete income record by ID |

---

###  Expenses Endpoints

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/expenses`     | Add new expense record      |
| GET    | `/expenses`     | Get all expense records     |
| PUT    | `/expenses/:id` | Update expense record by ID |
| DELETE | `/expenses/:id` | Delete expense record by ID |

---


## Example JSON Body (User)

```json
{
    "id" : "1",
    "name": "Rawan Abdellatif",
    "username": "Rawan ",
    "email": "rawan.k.abdellatif@gmail.com",
    "address": {
      "city": "Calgary",
      "street": "950 Arbour Lake RD",
      "suite": "104",
      "zipcode": "T3G5B3"
    }
 
}
```


## Example JSON Body (Income)

```json
{
  "wages": 1900,
  "secondaryIncome": 900,
  "interest": 920,
  "supportPayment": 90,
  "others": 900
}
```

## Example JSON Body (Expenses)

```json
{
  "id": "1",
  "Housing": {
    "Rent": 600,
    "maintainance": 100,
    "rent insurance": 400,
    "storage and parking": 500,
    "utilities": 200
  },
  "Insurance": {
    "health insurance": 600,
    "life insurance": 400,
    "others": 300
  },
  "Payment Obligations": {
    "Line of credit": 1000,
    "Loan": 6000,
    "credit card": 500,
    "vehicle lease": 200
  },
  "Personal": {
    "Hobbies": 200,
    "Personal grooming": 100,
    "clothing": 60,
    "dining out": 300,
    "gifts - family": 40,
    "others": 60,
    "transportation": 50
  },
  "Savings": {
    "Bonds": 200,
    "Investment Savings": 4000,
    "Long-term savings": 5000,
    "Others": 500,
    "RRSP": 1000
  },
  "Utilities": {
    "Cable": 200,
    "Electricity": 400,
    "Heat": 100,
    "Internet": 300,
    "others": 150,
    "phone": 600,
    "water": 400
  }
}
```


---

##  Technologies Used

* Node.js
* Express.js
* Firebase Admin SDK
* Firebase Realtime Database
* Nodemon
* Insomnia 

---



---

## 🙋‍♀️ Author

**Rawan Abdellatif**
GitHub: [@Rawan-Abdellatif](https://github.com/Rawan-Abdellatif)


