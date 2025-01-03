const jwt = require("jsonwebtoken");
const { ErrorHandler, TryCatch } = require("../Utils/utility.js");
const { User } = require("../Models/user.module.js");

const isAuthenticated = TryCatch(async (req, res, next) => {
    const token = req.cookies["time-table-app-token"] || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await  User.findById(decodedData._id).select('roll');

    if(!user) return next(new ErrorHandler('Unauthorized Access', 403));

    req.user = { id : decodedData._id, role: user.roll };
    
    next();
  
  });

  module.exports = { isAuthenticated };