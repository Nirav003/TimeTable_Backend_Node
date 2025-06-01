const jwt = require("jsonwebtoken");
const { ErrorHandler, TryCatch } = require("../Utils/utility.js");

const isAuthenticated = TryCatch(async (req, res, next) => {
    const token = req.cookies["time-table-app-token"] || req.headers.authorization?.split(' ')[1];

    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    // console.log('Decoded user : ',req.user);
      
    next();
  
  });

  module.exports = { isAuthenticated };