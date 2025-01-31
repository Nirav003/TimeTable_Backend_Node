const mongoose = require("mongoose");
const { TimetableSchedule } = require("../Models/timetableSchedule.module");
const Shift = require("../Models/shift.module");
const Stream = require("../Models/stream.module")
const { TryCatch, ErrorHandler } = require("../Utils/utility");
const moment = require("moment");
const Year = require("../Models/year.module");

//Create full year timetableschedule objects
const createYearTimetableSchedule = TryCatch(async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: "Please provide a date" });
  }

  const startDate = moment.utc(date, "DD/MM/YYYY").startOf('day');

  if (!startDate.isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use DD/MM/YYYY." });
  }

  const dates = [];
  const currentDate = startDate.clone();

  while (currentDate.year() === startDate.year()) {
    dates.push({
      jsDate: currentDate.toDate(),
      date: currentDate.format("DD/MM/YYYY"),
      dayOfWeek: currentDate.format("dddd"),
      month: currentDate.format("MMMM"),
      stream: "",
      shifts: [],
      holiday: "",
    });
    currentDate.add(1, "day");
  }

  await TimetableSchedule.insertMany(dates);

  res.status(201).json({ 
    success: true,
    message: "timetableSchedule entries created successfully" 
  });
});

//create a day in timetableschedule
const createDayOfTimetableSchedule = TryCatch( async (req, res) => {
  const { date, shifts = [], stream, holiday = '' } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Please provide a date' });
  }

  const parsedDate = moment(date, 'DD/MM/YYYY');

  if (!parsedDate.isValid()) {
    return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY.' });
  }

  if (!mongoose.Types.ObjectId.isValid(stream)) {
    return res.status(400).json({ error: 'Invalid stream ID format' });
  }

    // Set the time to noon to avoid timezone issues
    parsedDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });

    const dayOfWeek = parsedDate.format('dddd');
    const formattedDate = parsedDate.toDate();

    const newTimetableScheduleEntry = new TimetableSchedule({
      jsDate: formattedDate,
      date: parsedDate.format('DD/MM/YYYY'),
      dayOfWeek,
      month: parsedDate.format('MMMM'),
      stream,
      shifts,
      holiday
    });

    const savedEntry = await newTimetableScheduleEntry.save();
    res.status(201).json({
      success: true,
      message: "Day created successfully",
      entry: savedEntry,
    });
  
}
);

//Delete whole year timetableschedule objects
const deleteAllTimetableScheduleEntries = TryCatch(async (req, res) => {
  const result = await TimetableSchedule.deleteMany({});
  res.status(200).json({ message: "All timetableschedule entries deleted", result });
});

//Delete a specific date object
const deleteTimetableScheduleEntryByDate = TryCatch(async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: "Please provide a date" });
  }

  const result = await TimetableSchedule.deleteOne({
    date: date,
  });

  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: "No entry found for the given date" });
  }

  res.status(200).json({ 
    success: true,
    message: "Entry deleted successfully"
  });
});

//Delete calender objects within the range (startDate, endDate)
const deleteTimetableScheduleEntriesInRange = TryCatch(async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Please provide both startDate and endDate" });
  }

  const start = moment(startDate, "DD/MM/YYYY");
  let end = moment(endDate, "DD/MM/YYYY");

  if (!start.isValid() || !end.isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Please use DD/MM/YYYY." });
  }

  if (start.isAfter(end)) {
    return res.status(400).json({ error: "startDate must be before endDate" });
  }

  // Set end date to end of the day to include all entries on that day
  end = end.endOf('day');

  const result = await TimetableSchedule.deleteMany({
    jsDate: { $gte: start.toDate(), $lte: end.toDate() },
  });

  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: "No entries found in the given range" });
  }

  res
    .status(200)
    .json({ 
      success: true,
      message: `${result.deletedCount} entries deleted successfully` 
    });
}
);

// Update a timetableschedule entry
const updateTimetableScheduleDay = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { jsDate, date, dayOfWeek, month, stream, shifts, holiday } = req.body;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid timetableschedule ID format", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(stream)) {
    return next(new ErrorHandler("Invalid stream ID format", 400));
  }

  // Validate that the shifts are valid ObjectId references
  if (shifts && !Array.isArray(shifts)) {
    return next(new ErrorHandler("Shifts must be an array of ObjectId references", 400));
  }

  if (shifts) {
    for (let shiftId of shifts) {
      if (!mongoose.Types.ObjectId.isValid(shiftId)) {
        return next(new ErrorHandler(`Invalid shift ID format: ${shiftId}`, 400));
      }

      const shiftExists = await Shift.findById(shiftId);
      if (!shiftExists) {
        return next(new ErrorHandler(`Shift not found: ${shiftId}`, 404));
      }
    }
  }
  
  const updatedTimetableSchedule = await TimetableSchedule.findByIdAndUpdate(
    id,
    {
      jsDate,
      date,
      dayOfWeek,
      month,
      stream,
      shifts, // Array of ObjectId references
      holiday
    },
    { new: true }
  ).populate(
    [
      {path: "stream"},
      {
    path: 'shifts',
    populate: { 
      path: "timeSlot",
      populate: {
        path: "lecture",
        populate: [
          {path: "subject"},
          {path: "professor"},
          {path: "room"},
          {path: "division"}
        ] 
      }
    }
  }]);

  if (!updatedTimetableSchedule) {
    return next(new ErrorHandler("TimetableSchedule not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "TimetableSchedule updated successfully",
    timetableschedule: updatedTimetableSchedule
  });
});

const getTimetableSchedule = TryCatch(async (req, res, next) => {
  const { stream, year, date } = req.query;

  if (!stream || !year || !date) {
    return res.status(400).json({ error: "Please provide stream, year, and date." });
  }

  // Split the stream (e.g., 'BSc IT') into name ('BSc') and specialisation ('IT')
  const [name, specialisation] = stream.split(' ');
  // console.log(name, '\n', specialisation);

  // Validate the date format (DD/MM/YYYY)
  const parsedDate = moment(date, 'DD/MM/YYYY');
  if (!parsedDate.isValid()) {
    return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY.' });
  }

  // Find the Year document based on year
  const yearData = await Year.findOne({ year });

  // Find the Stream document based on name, specialisation, and year
  const streamData = await Stream.findOne({
    name: name.trim().toUpperCase(),
    specialisation: specialisation.trim().toUpperCase(),
    year: yearData._id
  }).populate({
    path: 'year',
  });

  if (!streamData) {
    return res.status(404).json({ message: "No stream found for the provided details." });
  }

  // Find the TimetableSchedule data for the given date and stream
  const dayData = await TimetableSchedule.findOne({ date: parsedDate.format('DD/MM/YYYY') })
    .populate([
      {
        path: 'stream',
        match: { _id: streamData._id }
      },
      {
        path: 'shifts',
        populate: {
          path: "timeSlot",
          populate: {
            path: "lecture",
            populate: [
              { path: "subject" },
              { path: "professor" },
              { path: "room" },
              { path: "division" }
            ]
          }
        }
      }
    ]);

    console.log(dayData);
    

  if (!dayData || dayData.shifts.length === 0) {
    return res.status(404).json({ message: "No timetable found for this stream and date." });
  }

  res.status(200).json({
    success: true,
    message: "Timetable retrieved successfully",
    timetable: dayData
  });
});

const getWeeklyTimetable = TryCatch(async (req, res) => {
    // Extract user info from session or request (assuming middleware sets req.user)
    console.log(req.user);
    
    const { batch, year } = req.user.user; // Ensure `req.user` has this info from authentication

    if (!batch || !year) {
      return res.status(400).json({ message: 'Stream and Year are required' });
    }

    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Determine Monday–Sunday week range based on the given date
    const startOfWeek = moment(date, 'DD/MM/YYYY').startOf('isoWeek'); // Monday
    const endOfWeek = moment(date, 'DD/MM/YYYY').endOf('isoWeek'); // Sunday

    const dateRange = [];
    for (let i = 0; i < 7; i++) {
      dateRange.push(moment(startOfWeek).add(i, 'days').format('DD/MM/YYYY'));
    }

    const yearData = await Year.findOne({ year });
    console.log(yearData);

    const [name, specialisation] = batch.split(' ');
    const stream = await Stream.findOne({ name, specialisation, year: yearData._id }).populate('year');
    console.log(name);
    console.log(specialisation);
    console.log(stream);
        

    // Fetch timetable only for the logged-in student's stream & year
    const weekTimetable = await TimetableSchedule.find({
      date: { $in: dateRange },
      batch,
      year
    });

    // Structure response grouped by day
    const formattedData = dateRange.map((day) => {
      const dayData = weekTimetable.find((entry) => entry.date === day);
      return {
        date: day,
        dayOfWeek: moment(day, 'DD/MM/YYYY').format('dddd'), // Convert to 'Monday', 'Tuesday', etc.
        isHoliday: dayData ? dayData.isHoliday : false, // Check if the day is a holiday
        holiday: dayData?.holiday || '', // If it's a holiday, store the name
        shifts: dayData && !dayData.isHoliday ? dayData.shifts : [] // Show shifts only if it's not a holiday
      };
    });

    res.json({ 
      success: true,
      message: 'Weekly timetable retrieved successfully',
      timetable: formattedData 
    });
});

const getAllSchedule = TryCatch(async (req, res, next) => {
  const allSchedule = await TimetableSchedule.find().populate([
    {
      path: 'shifts',
      populate: {
        path: "timeSlot",
        populate: {
          path: "lecture",
          populate: [
            { path: "subject" },
            { path: "professor" },
            { path: "room" },
            { path: "division" }
          ]
        }
      }
    }
  ]).populate({
    path: 'stream',
    populate: { path: 'year' }
  });

  if (allSchedule.length === 0) {
    return next(new ErrorHandler("No timetable schedule found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Timetable schedule retrieved successfully",
    timetable: allSchedule
  });
})

module.exports = {
  createYearTimetableSchedule,
  createDayOfTimetableSchedule,
  deleteAllTimetableScheduleEntries,
  deleteTimetableScheduleEntryByDate,
  deleteTimetableScheduleEntriesInRange,
  updateTimetableScheduleDay,
  getTimetableSchedule,
  getAllSchedule,
  getWeeklyTimetable
};
