const {compare} = require('bcrypt')
const { TryCatch } = require('../Utils/utility.js');
const {
    cookieOptions,
    sendToken
} =  require("../Utils/utility.js");
const { ErrorHandler } = require("../Utils/utility.js");
const {User} = require("../Models/user.module.js");

// Create a new user and save it to the database and save token in cookie
const newUser = TryCatch(async (req, res, next) => {
    const { 
      name, 
      email, 
      batch, 
      year, 
      division,
      phone, 
      password, 
      role 
    } = req.body;    

    const user = await User.create({
      name,
      email,
      batch,
      year,
      division: division || null,
      phone,
      password,
      role: role || 'student'
    });
  
    sendToken(res, user, 201, "User created");
  });
  
  // Login user and save token in cookie
  const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));
  
    const isMatch = await compare(password, user.password);
  
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 404));
  
    sendToken(res, user, 200, `Welcome Back, ${user.name}`);
  });

  const logout = TryCatch(async (req, res) => {
    return res
      .status(200)
      .cookie("time-table-app-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  });

  const profile = TryCatch(async (req, res, next) => {

    const user = await User.findById(req.user._id);    

    return res.status(200).json({
      success: true,
      user: user,
      message: "User profile fetched successfully",
    })
  })

  const getAllUsers = TryCatch(async (req, res, next) => {

    const users = await User.find();    

    if(!users) return next(new ErrorHandler('Users not found',400));

    res.status(200).json({
      success: true,
      message: "Users found successfully",
      user: users
    });
  })  

  module.exports = {
    newUser,
    login,
    logout,
    profile,
    getAllUsers
  };