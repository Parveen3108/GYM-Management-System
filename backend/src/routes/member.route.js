const express = require("express");

const router = express.Router();

const { createMember } = require("../controllers/member.controller");

router.post("/", createMember);

module.exports = router;
