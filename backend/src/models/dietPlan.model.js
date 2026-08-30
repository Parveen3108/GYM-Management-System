const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    planName: {
      type: String,
      required: true,
      trim: true,
    },

    goal: {
      type: String,
      enum: [
        "Weight Loss",
        "Weight Gain",
        "Muscle Gain",
        "Maintenance",
        "General Fitness",
      ],
      required: true,
    },

    breakfast: {
      type: String,
      required: true,
      trim: true,
    },

    lunch: {
      type: String,
      required: true,
      trim: true,
    },

    dinner: {
      type: String,
      required: true,
      trim: true,
    },

    snacks: {
      type: String,
      trim: true,
    },

    calories: {
      type: Number,
      min: 0,
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

module.exports = DietPlan;