const { User } = require("../Models/user.module.js");
const { TryCatch } = require("../Utils/utility");

// Get All MC Members
const getAllMcMembers =  TryCatch(async (req, res) => {
  
  const mcMembers = await User.find({ role: "management" });
  res.status(200).json({
    success: true,
    message: "All MC Members",
    members: mcMembers
  });
  
});

module.exports = {
  getAllMcMembers
};
