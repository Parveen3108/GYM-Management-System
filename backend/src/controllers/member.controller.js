const member = require("../models/member.model");

// Create a new member----------------------------------------------------------

const createMember = async (req, res) => {
  try {
    const { name, email, phone, membership } = req.body;
    if (!name || !email || !phone || !membership) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingMember = await member.findOne({ email });

    if (existingMember) {
      return res.status(400).json({
        message: "Member with this email already exists",
      });
    }

    const newMember = await member.create({
      name,
      email,
      phone,
      membership,
    });

    res.status(201).json({
      message: "Member created successfully",
      data: newMember,
    });
  } catch (err) {
    console.error("Error creating member", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get all members-----------------------------------------------------------------

const getAllmembers = async (req, res) => {
  try {
    const members = await member.find();
    res.status(200).json({
      message: "Members fetched successfully",
      data: members,
    });
  } catch (err) {
    console.error("Error fetching members", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//get member by id-----------------------------------------------------------------

const getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;

    const member = await member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    res.status(200).json({
      message: "Member fetched successfully",
      data: member,
    });
  } catch (err) {
    console.error("Error fetching member", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//update member by id-----------------------------------------------------------------

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await member.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(400).json({
        message: "Member not found",
      });
    }
    res.status(200).json({
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (err) {
    console.error("Error updating member", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//delete member by id --------------------------------------------------------------

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await member.findByIdAndDelete(id);
    if (!deletedMember) {
      res.status(404).json({
        message: "member not deleted",
      });
    }
    res.status(200).json({
      message: "member deleted successfully",
      data: deletedMember,
    });
  } catch (err) {
    (console.error("Error deleting member", err),
      res.status(500).json({
        message: "internal sever error",
      }));
  }
};

// Export the functions

module.exports = {
  createMember,
  getAllmembers,
  getMemberById,
  updateMember,
  deleteMember,
};
