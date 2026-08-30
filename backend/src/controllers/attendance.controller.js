const Attendance = require("../models/attendance.model");
const Member = require("../models/member.model");

// ===============================
// CREATE / MARK ATTENDANCE
// ===============================
const createAttendance = async (req, res) => {
  try {
    const {
      member,
      date,
      checkIn,
      checkOut,
      status,
    } = req.body;

    if (!member || !checkIn) {
      return res.status(400).json({
        message: "Member and check-in time are required",
      });
    }

    // Check member exists
    const existingMember = await Member.findById(member);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Check attendance already exists for same member/date
    const attendanceDate = date
      ? new Date(date)
      : new Date();

    const startOfDay = new Date(attendanceDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(attendanceDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
      member,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for this member today",
      });
    }

    const newAttendance = await Attendance.create({
      member,
      date: attendanceDate,
      checkIn,
      checkOut,
      status: status || "Present",
    });

    const populatedAttendance =
      await Attendance.findById(newAttendance._id)
        .populate("member", "name email phone");

    return res.status(201).json({
      message: "Attendance marked successfully",
      data: populatedAttendance,
    });
  } catch (err) {
    console.error("Error creating attendance:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET ALL ATTENDANCE
// ===============================
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("member", "name email phone")
      .sort({
        date: -1,
      });

    return res.status(200).json({
      message: "Attendance fetched successfully",
      count: attendance.length,
      data: attendance,
    });
  } catch (err) {
    console.error("Error fetching attendance:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// GET ATTENDANCE BY ID
// ===============================
const getAttendanceById = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    const attendance = await Attendance.findById(
      attendanceId
    ).populate("member", "name email phone");

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error fetching attendance:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// UPDATE ATTENDANCE
// ===============================
const updateAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    const {
      member,
      date,
      checkIn,
      checkOut,
      status,
    } = req.body;

    const attendance = await Attendance.findById(
      attendanceId
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    // If member is changed, check member exists
    if (member !== undefined) {
      const existingMember = await Member.findById(member);

      if (!existingMember) {
        return res.status(404).json({
          message: "Member not found",
        });
      }

      attendance.member = member;
    }

    if (date !== undefined) {
      attendance.date = date;
    }

    if (checkIn !== undefined) {
      attendance.checkIn = checkIn;
    }

    if (checkOut !== undefined) {
      attendance.checkOut = checkOut;
    }

    if (status !== undefined) {
      attendance.status = status;
    }

    const updatedAttendance =
      await attendance.save();

    const populatedAttendance =
      await Attendance.findById(updatedAttendance._id)
        .populate("member", "name email phone");

    return res.status(200).json({
      message: "Attendance updated successfully",
      data: populatedAttendance,
    });
  } catch (err) {
    console.error("Error updating attendance:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


// ===============================
// DELETE ATTENDANCE
// ===============================
const deleteAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;

    const attendance =
      await Attendance.findByIdAndDelete(attendanceId);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      message: "Attendance deleted successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error deleting attendance:", err);

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


module.exports = {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};