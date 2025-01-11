const nodemailer = require('nodemailer');
const cron = require('node-cron');
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

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { 
    user: process.env.EMAIL,
    pass: process.env.PASS 
  }
});

const sendEmail = (to, subject, text) => {

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };
  transporter.sendMail(mailOptions);
};


const scheduleReminder = (meeting) => {
  const date = new Date(meeting.dateTime);
  cron.schedule(`0 ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth()+1} *`, () => {
    meeting.participants.forEach(member => {
      sendEmail(member.email, `Reminder: ${meeting.title}`, `Join at ${meeting.dateTime}`);
    });
  });
};


module.exports = {
  ErrorHandler,
  TryCatch,
  cookieOptions,
  sendToken,
  sendEmail,
  scheduleReminder,
};
