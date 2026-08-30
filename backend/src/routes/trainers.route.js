const express = require("express");

const router = express.Router();

const {
  createTrainer,
  getAllTrainer,
  getTrainersById,
  deleteTrainerById
}= require("../controllers/trainers.controller");

router.post("/",createTrainer);
router.get("/",getAllTrainer);
router.get("/:id",getTrainersById);
router.delete("/:id",deleteTrainerById);

module.exports = router;