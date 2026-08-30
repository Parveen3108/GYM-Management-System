const express = require("express");

const {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance.controller");

const router = express.Router();


// Mark attendance
router.post("/", createAttendance);

// Get all attendance
router.get("/", getAttendance);

// Get attendance by ID
router.get("/:id", getAttendanceById);

// Update attendance
router.put("/:id", updateAttendance);

// Delete attendance
router.delete("/:id", deleteAttendance);


module.exports = router;