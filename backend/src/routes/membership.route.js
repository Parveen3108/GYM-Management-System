const express = require("express");

const {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} = require("../controllers/membership.controller");

const router = express.Router();


// Create membership
router.post("/", createMembership);

// Get all memberships
router.get("/", getMemberships);

// Get single membership
router.get("/:id", getMembershipById);

// Update membership
router.put("/:id", updateMembership);

// Delete membership
router.delete("/:id", deleteMembership);


module.exports = router;