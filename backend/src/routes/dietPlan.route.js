const express = require("express");

const {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
} = require("../controllers/dietPlan.controller");

const router = express.Router();


// Create diet plan
router.post("/", createDietPlan);

// Get all diet plans
router.get("/", getDietPlans);

// Get diet plan by ID
router.get("/:id", getDietPlanById);

// Update diet plan
router.put("/:id", updateDietPlan);

// Delete diet plan
router.delete("/:id", deleteDietPlan);


module.exports = router;