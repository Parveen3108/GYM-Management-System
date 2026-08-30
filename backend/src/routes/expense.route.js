const express = require("express");

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} = require("../controllers/expense.controller");

const router = express.Router();


// Create expense
router.post("/", createExpense);

// Get all expenses
router.get("/", getExpenses);

// Get expense summary
router.get("/summary", getExpenseSummary);

// Get expense by ID
router.get("/:id", getExpenseById);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);


module.exports = router;