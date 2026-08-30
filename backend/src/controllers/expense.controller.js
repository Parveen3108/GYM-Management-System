const Expense = require("../models/expense.model");

// =================================
// CREATE EXPENSE
// =================================
const createExpense = async (req, res) => {
  try {
    const {
      title,
      category,
      amount,
      date,
      description,
      status,
    } = req.body;

    if (!title || !category || amount === undefined) {
      return res.status(400).json({
        message: "Title, category and amount are required",
      });
    }

    const expense = await Expense.create({
      title: title.trim(),
      category,
      amount,
      date: date || Date.now(),
      description,
      status: status || "Paid",
    });

    return res.status(201).json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (err) {
    console.error("Error creating expense:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// GET ALL EXPENSES
// =================================
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      date: -1,
    });

    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const paidExpense = expenses
      .filter((expense) => expense.status === "Paid")
      .reduce((total, expense) => total + expense.amount, 0);

    const pendingExpense = expenses
      .filter((expense) => expense.status === "Pending")
      .reduce((total, expense) => total + expense.amount, 0);

    return res.status(200).json({
      message: "Expenses fetched successfully",

      count: expenses.length,

      summary: {
        totalExpense,
        paidExpense,
        pendingExpense,
      },

      data: expenses,
    });
  } catch (err) {
    console.error("Error fetching expenses:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// GET EXPENSE BY ID
// =================================
const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense fetched successfully",
      data: expense,
    });
  } catch (err) {
    console.error("Error fetching expense:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// UPDATE EXPENSE
// =================================
const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const {
      title,
      category,
      amount,
      date,
      description,
      status,
    } = req.body;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (title !== undefined) {
      expense.title = title.trim();
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (date !== undefined) {
      expense.date = date;
    }

    if (description !== undefined) {
      expense.description = description;
    }

    if (status !== undefined) {
      expense.status = status;
    }

    const updatedExpense = await expense.save();

    return res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (err) {
    console.error("Error updating expense:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// DELETE EXPENSE
// =================================
const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      data: expense,
    });
  } catch (err) {
    console.error("Error deleting expense:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// EXPENSE SUMMARY
// =================================
const getExpenseSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const paidExpense = expenses
      .filter((expense) => expense.status === "Paid")
      .reduce((total, expense) => total + expense.amount, 0);

    const pendingExpense = expenses
      .filter((expense) => expense.status === "Pending")
      .reduce((total, expense) => total + expense.amount, 0);

    return res.status(200).json({
      message: "Expense summary fetched successfully",

      data: {
        totalExpense,
        paidExpense,
        pendingExpense,
        totalRecords: expenses.length,
      },
    });
  } catch (err) {
    console.error("Error fetching expense summary:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
};