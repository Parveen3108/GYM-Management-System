const Membership = require("../models/membership.model");

// ===============================
// CREATE MEMBERSHIP
// ===============================
const createMembership = async (req, res) => {
  try {
    const { name, duration, price, description } = req.body;

    // Validation
    if (!name || !duration || price === undefined) {
      return res.status(400).json({
        message: "Name, duration and price are required",
      });
    }

    // Check duplicate membership
    const existingMembership = await Membership.findOne({
      name: name.trim(),
    });

    if (existingMembership) {
      return res.status(400).json({
        message: "Membership with this name already exists",
      });
    }

    // Create membership
    const newMembership = await Membership.create({
      name: name.trim(),
      duration,
      price,
      description,
    });

    return res.status(201).json({
      message: "Membership created successfully",
      data: newMembership,
    });
  } catch (err) {
    console.error("Error creating membership:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET ALL MEMBERSHIPS
// ===============================
const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Memberships fetched successfully",
      count: memberships.length,
      data: memberships,
    });
  } catch (err) {
    console.error("Error fetching memberships:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET SINGLE MEMBERSHIP
// ===============================
const getMembershipById = async (req, res) => {
  try {
    const membershipId = req.params.id;

    const membership = await Membership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    return res.status(200).json({
      message: "Membership fetched successfully",
      data: membership,
    });
  } catch (err) {
    console.error("Error fetching membership:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// UPDATE MEMBERSHIP
// ===============================
const updateMembership = async (req, res) => {
  try {
    const membershipId = req.params.id;

    const { name, duration, price, description, status } = req.body;

    const membership = await Membership.findById(membershipId);

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    // Check duplicate name
    if (name && name.trim() !== membership.name) {
      const existingMembership = await Membership.findOne({
        name: name.trim(),
        _id: { $ne: membershipId },
      });

      if (existingMembership) {
        return res.status(400).json({
          message: "Membership with this name already exists",
        });
      }

      membership.name = name.trim();
    }

    if (duration !== undefined) {
      membership.duration = duration;
    }

    if (price !== undefined) {
      membership.price = price;
    }

    if (description !== undefined) {
      membership.description = description;
    }

    if (status !== undefined) {
      membership.status = status;
    }

    const updatedMembership = await membership.save();

    return res.status(200).json({
      message: "Membership updated successfully",
      data: updatedMembership,
    });
  } catch (err) {
    console.error("Error updating membership:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// DELETE MEMBERSHIP
// ===============================
const deleteMembership = async (req, res) => {
  try {
    const membershipId = req.params.id;

    const membership = await Membership.findByIdAndDelete(
      membershipId
    );

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    return res.status(200).json({
      message: "Membership deleted successfully",
      data: membership,
    });
  } catch (err) {
    console.error("Error deleting membership:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


module.exports = {
  createMembership,
  getMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
};