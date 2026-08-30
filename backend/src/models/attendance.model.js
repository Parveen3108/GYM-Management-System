const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

module.exports = Attendance;