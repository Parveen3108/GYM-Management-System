const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer"],
      default: "Cash",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;