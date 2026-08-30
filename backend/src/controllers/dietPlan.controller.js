const DietPlan = require("../models/dietPlan.model");
const Member = require("../models/member.model");

// =================================
// CREATE DIET PLAN
// =================================
const createDietPlan = async (req, res) => {
  try {
    const {
      member,
      planName,
      goal,
      breakfast,
      lunch,
      dinner,
      snacks,
      calories,
      notes,
    } = req.body;

    if (
      !member ||
      !planName ||
      !goal ||
      !breakfast ||
      !lunch ||
      !dinner
    ) {
      return res.status(400).json({
        message:
          "Member, plan name, goal, breakfast, lunch and dinner are required",
      });
    }

    // Check member
    const existingMember = await Member.findById(member);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Check duplicate plan for same member
    const existingPlan = await DietPlan.findOne({
      member,
      planName: planName.trim(),
    });

    if (existingPlan) {
      return res.status(400).json({
        message: "This diet plan already exists for this member",
      });
    }

    const newDietPlan = await DietPlan.create({
      member,
      planName: planName.trim(),
      goal,
      breakfast: breakfast.trim(),
      lunch: lunch.trim(),
      dinner: dinner.trim(),
      snacks,
      calories,
      notes,
    });

    const populatedDietPlan = await DietPlan.findById(
      newDietPlan._id
    ).populate("member", "name email phone");

    return res.status(201).json({
      message: "Diet plan created successfully",
      data: populatedDietPlan,
    });
  } catch (err) {
    console.error("Error creating diet plan:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// GET ALL DIET PLANS
// =================================
const getDietPlans = async (req, res) => {
  try {
    const dietPlans = await DietPlan.find()
      .populate("member", "name email phone")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      message: "Diet plans fetched successfully",
      count: dietPlans.length,
      data: dietPlans,
    });
  } catch (err) {
    console.error("Error fetching diet plans:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// GET DIET PLAN BY ID
// =================================
const getDietPlanById = async (req, res) => {
  try {
    const dietPlanId = req.params.id;

    const dietPlan = await DietPlan.findById(
      dietPlanId
    ).populate("member", "name email phone");

    if (!dietPlan) {
      return res.status(404).json({
        message: "Diet plan not found",
      });
    }

    return res.status(200).json({
      message: "Diet plan fetched successfully",
      data: dietPlan,
    });
  } catch (err) {
    console.error("Error fetching diet plan:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// UPDATE DIET PLAN
// =================================
const updateDietPlan = async (req, res) => {
  try {
    const dietPlanId = req.params.id;

    const {
      member,
      planName,
      goal,
      breakfast,
      lunch,
      dinner,
      snacks,
      calories,
      notes,
      status,
    } = req.body;

    const dietPlan = await DietPlan.findById(dietPlanId);

    if (!dietPlan) {
      return res.status(404).json({
        message: "Diet plan not found",
      });
    }

    // Check new member
    if (member !== undefined) {
      const existingMember = await Member.findById(member);

      if (!existingMember) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      dietPlan.member = member;
    }

    if (planName !== undefined) {
      dietPlan.planName = planName.trim();
    }

    if (goal !== undefined) {
      dietPlan.goal = goal;
    }

    if (breakfast !== undefined) {
      dietPlan.breakfast = breakfast.trim();
    }

    if (lunch !== undefined) {
      dietPlan.lunch = lunch.trim();
    }

    if (dinner !== undefined) {
      dietPlan.dinner = dinner.trim();
    }

    if (snacks !== undefined) {
      dietPlan.snacks = snacks;
    }

    if (calories !== undefined) {
      dietPlan.calories = calories;
    }

    if (notes !== undefined) {
      dietPlan.notes = notes;
    }

    if (status !== undefined) {
      dietPlan.status = status;
    }

    const updatedDietPlan = await dietPlan.save();

    const populatedDietPlan = await DietPlan.findById(
      updatedDietPlan._id
    ).populate("member", "name email phone");

    return res.status(200).json({
      message: "Diet plan updated successfully",
      data: populatedDietPlan,
    });
  } catch (err) {
    console.error("Error updating diet plan:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// =================================
// DELETE DIET PLAN
// =================================
const deleteDietPlan = async (req, res) => {
  try {
    const dietPlanId = req.params.id;

    const dietPlan = await DietPlan.findByIdAndDelete(
      dietPlanId
    );

    if (!dietPlan) {
      return res.status(404).json({
        message: "Diet plan not found",
      });
    }

    return res.status(200).json({
      message: "Diet plan deleted successfully",
      data: dietPlan,
    });
  } catch (err) {
    console.error("Error deleting diet plan:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


module.exports = {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
};