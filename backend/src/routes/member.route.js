const express = require("express");

const router = express.Router();

const {
  createMember,
  getAllmembers,
  getMemberById,
  updateMember,
  deleteMember
} = require("../controllers/member.controller");

router.post("/", createMember);
router.get("/", getAllmembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
