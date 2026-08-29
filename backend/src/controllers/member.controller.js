const member = require("../models/member.model");

const createMember = async (req, res)=>{
  try{
    const {name,email,phone,membership} = req.body;
    if(!name || !email || !phone || !membership){
      return res.status(400).json({
        message : "All fields are required"
      })
    }
  
  const existingMember = await member.findOne({email});

  if(existingMember){
    return res.status(400).json({
      message : "Member with this email already exists"
    })
  }

  const newMember = await member.create({
    name,
    email,
    phone,
    membership
  })

  res.status(201).json({
    message : "Member created successfully",
    data : newMember,
  })
}catch(err){
  console.error("Error creating member", err);
  res.status(500).json({
    message : "Internal server error"
  })
}

}

module.exports = {createMember,};