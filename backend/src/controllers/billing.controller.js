const Billing = require("../models/billing.model");
const Member = require("../models/member.model");

// ===============================
// CREATE BILL
// ===============================
const createBill = async (req, res) => {
  try {
    const {
      member,
      amount,
      paymentStatus,
      paymentMethod,
      paymentDate,
      description,
    } = req.body;

    if (!member || amount === undefined) {
      return res.status(400).json({
        message: "Member and amount are required",
      });
    }

    const existingMember = await Member.findById(member);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const newBill = await Billing.create({
      member,
      amount,
      paymentStatus: paymentStatus || "Pending",
      paymentMethod: paymentMethod || "Cash",
      paymentDate: paymentDate || Date.now(),
      description,
    });

    const populatedBill = await Billing.findById(newBill._id)
      .populate("member", "name email phone");

    return res.status(201).json({
      message: "Bill created successfully",
      data: populatedBill,
    });
  } catch (err) {
    console.error("Error creating bill:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET ALL BILLS
// ===============================
const getBills = async (req, res) => {
  try {
    const bills = await Billing.find()
      .populate("member", "name email phone")
      .sort({
        createdAt: -1,
      });

    const totalRevenue = bills.reduce(
      (total, bill) => total + bill.amount,
      0
    );

    const paidAmount = bills
      .filter((bill) => bill.paymentStatus === "Paid")
      .reduce((total, bill) => total + bill.amount, 0);

    const pendingAmount = bills
      .filter((bill) => bill.paymentStatus === "Pending")
      .reduce((total, bill) => total + bill.amount, 0);

    return res.status(200).json({
      message: "Bills fetched successfully",
      count: bills.length,

      summary: {
        totalRevenue,
        totalBills: bills.length,
        paidAmount,
        pendingAmount,
      },

      data: bills,
    });
  } catch (err) {
    console.error("Error fetching bills:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET BILL BY ID
// ===============================
const getBillById = async (req, res) => {
  try {
    const billId = req.params.id;

    const bill = await Billing.findById(billId)
      .populate("member", "name email phone");

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      message: "Bill fetched successfully",
      data: bill,
    });
  } catch (err) {
    console.error("Error fetching bill:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// UPDATE BILL
// ===============================
const updateBill = async (req, res) => {
  try {
    const billId = req.params.id;

    const {
      member,
      amount,
      paymentStatus,
      paymentMethod,
      paymentDate,
      description,
    } = req.body;

    const bill = await Billing.findById(billId);

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    if (member !== undefined) {
      const existingMember = await Member.findById(member);

      if (!existingMember) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      bill.member = member;
    }

    if (amount !== undefined) {
      bill.amount = amount;
    }

    if (paymentStatus !== undefined) {
      bill.paymentStatus = paymentStatus;
    }

    if (paymentMethod !== undefined) {
      bill.paymentMethod = paymentMethod;
    }

    if (paymentDate !== undefined) {
      bill.paymentDate = paymentDate;
    }

    if (description !== undefined) {
      bill.description = description;
    }

    const updatedBill = await bill.save();

    const populatedBill = await Billing.findById(updatedBill._id)
      .populate("member", "name email phone");

    return res.status(200).json({
      message: "Bill updated successfully",
      data: populatedBill,
    });
  } catch (err) {
    console.error("Error updating bill:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// DELETE BILL
// ===============================
const deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;

    const bill = await Billing.findByIdAndDelete(billId);

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      message: "Bill deleted successfully",
      data: bill,
    });
  } catch (err) {
    console.error("Error deleting bill:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
};