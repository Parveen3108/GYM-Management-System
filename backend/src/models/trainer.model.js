const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  Experience: {
    type: String,
    required: true,
  },

  joiningDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
