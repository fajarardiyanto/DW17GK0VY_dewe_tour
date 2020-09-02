const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const { authenticated } = require("../middleware/auth");

// User
const {
  register,
  login,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/user");

// Country
const {
  getCountry,
  createCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");

// Trip
const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");

// Transaction
const {
  getTransactions,
  createTransaction,
  getTransactionById,
  getTransactionByUserId,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

// User
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", fileUpload(), updateUser);
router.delete("/user/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);

// Country
router.get("/countrys", getCountry);
router.get("/country/:id", getCountryById);
router.post("/country", authenticated, createCountry);
router.patch("/country/:id", authenticated, updateCountry);
router.delete("/country/:id", authenticated, deleteCountry);

// Trip
router.get("/trips", getTrips);
router.get("/trip/:id", getTripById);
router.post("/trip", authenticated, fileUpload(), createTrip);
router.patch("/trip/:id", authenticated, updateTrip);
router.delete("/trip/:id", authenticated, deleteTrip);

// Transcation
router.get("/transactions", authenticated, getTransactions);
router.get("/transaction/:id", authenticated, getTransactionById);
router.get("/transactions/:id", authenticated, getTransactionByUserId);
router.post("/transaction", authenticated, createTransaction);
router.patch("/transaction/:id", authenticated, updateTransaction);
router.delete("/transaction/:id", authenticated, deleteTransaction);

module.exports = router;
