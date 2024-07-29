const {Lecture} = require('../Models/lecture.module.js');
const { ErrorHandler, TryCatch } = require('../Utils/utility.js');

// Create a new lecture
const createLecture = TryCatch( async ( req, res, next ) => {

    const { subject, calendar, classroom, professor, slot, batch, division } = req.body;
  
    if ( !subject || !calendar || !classroom || !professor || !slot || !batch || !division)   return next(new ErrorHandler("Invalid input", 400));

    const newLecture = new Lecture({ subject, calendar, classroom, professor, slot, batch, division });
    await newLecture.save();
    // console.log(newLecture);
    res.status(200).json({
        message: 'Lecture saved successfully',
        data: newLecture
    });

})


module.exports = { createLecture };
