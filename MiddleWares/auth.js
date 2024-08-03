const jwt = require("jsonwebtoken");
const { ErrorHandler, TryCatch } = require("../Utils/utility.js");
const {APP_TOKEN} = require('../Config/config.js');

const isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies[APP_TOKEN];
    console.log(token);
    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decodedData._id;
  
    next();
  });

  module.exports = { isAuthenticated };