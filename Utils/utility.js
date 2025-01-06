const jwt = require("jsonwebtoken");

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    // res.status(error.statusCode).json(error.message);
    next(error);
  }
};

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.expiresIn });
  
  return res.status(code).cookie("time-table-app-token", token, cookieOptions).json({
    success: true,
    user,
    message,
    token
  });
};


module.exports = {
  ErrorHandler,
  TryCatch,
  cookieOptions,
  sendToken
};
