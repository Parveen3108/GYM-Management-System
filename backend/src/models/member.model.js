const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    membership: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;