const trainer = require("../models/trainer.model");

// create trainer ----------------------------------------------------------

const createTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialization, Experience, joiningDate } =
      req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !specialization ||
      !Experience ||
      !joiningDate
    ) {
      res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingTrainer = await trainer.findOne({ email });

    if (existingTrainer) {
      res.status(400).json({
        message: "Trainer with this email already exists",
      });
    }

    const newTrainer = await trainer.create({
      name,
      email,
      phone,
      specialization,
      Experience,
      joiningDate,
    });

    res.status(201).json({
      message: "Trainer created successfully",
      trainer: newTrainer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating trainer",
      error: err,
    });
  }
};

//  get all trainers ----------------------------------------------------------

const getAllTrainer = async (req, res) => {
  try {
    const trainers = await trainer.find();
    res.status(200).json({
      message: "Trainers fetched successfully",
      data: trainers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching trainers",
      error: err,
    });
  }
};

// get trainer by id ----------------------------------------------------------

const getTrainersById = async (req, res) => {
 try{
   const trainersId = req.params.id;

  const trainers = await trainer.findById(trainersId);
  if (!trainer) {
    return res.status(404).json({
      message: "Trainer not fonud",
    });
  }
  res.status(200).json({
    meassge:"trainer found sucssfuly",
    data : trainers
  })
 }
 catch(err){
  console.error("err : ",err)
  res.status(500).json({
    message:"internal server error"
  })
 }
};


// delete trainer by id-----------------------------------------------------------

const deleteTrainerById = async(req,res)=>{
  try{
    const {id} = req.params
    const deletedTrainer = await trainer.findByIdAndDelete(id);
    
    if(!deletedTrainer){
      return res.status(404).json({
        message :"trainer not delete"
      })
    }
    res.status(200).json({
      message:"delete sucessfuly",
      data : deletedTrainer
    })
  }catch(err){
    console.error("error deleted trainer : ", err)
    res.status(500).json({
      message:"internal sever error"
    })
  }
}

module.exports = { createTrainer, getAllTrainer, getTrainersById, deleteTrainerById};
