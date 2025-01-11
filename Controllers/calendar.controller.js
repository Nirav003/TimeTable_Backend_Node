const mongoose = require("mongoose");
const { Calendar } = require("../Models/calendar.module");
const Shift = require("../Models/shift.module");
const Stream = require("../Models/stream.module")
const { TryCatch } = require("../Utils/utility");
const moment = require("moment");
const Year = require("../Models/year.module");

//Create full year calendar objects
const createYearCalendar = TryCatch(async (req, res) => {
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
      shifts: [],
      holiday: "",
    });
    currentDate.add(1, "day");
  }

  await Calendar.insertMany(dates);

  res.status(201).json({ 
    success: true,
    message: "Calendar entries created successfully" 
  });
});

//create a day in calendar
const createDayOfCalendar = TryCatch( async (req, res) => {
  const { date, shifts = [], holiday = '' } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Please provide a date' });
  }

    const parsedDate = moment(date, 'DD/MM/YYYY');

    if (!parsedDate.isValid()) {
      return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY.' });
    }

    // Set the time to noon to avoid timezone issues
    parsedDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });

    const dayOfWeek = parsedDate.format('dddd');
    const formattedDate = parsedDate.toDate();

    const newCalendarEntry = new Calendar({
      jsDate: formattedDate,
      date: parsedDate.format('DD/MM/YYYY'),
      dayOfWeek,
      month: parsedDate.format('MMMM'),
      shifts,
      holiday
    });

    const savedEntry = await newCalendarEntry.save();
    res.status(201).json({
      success: true,
      message: "Day created successfully",
      entry: savedEntry,
    });
  
}
);

//Delete whole year calendar objects
const deleteAllCalendarEntries = TryCatch(async (req, res) => {
  const result = await Calendar.deleteMany({});
  res.status(200).json({ message: "All calendar entries deleted", result });
});

//Delete a specific date object
const deleteCalendarEntryByDate = TryCatch(async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: "Please provide a date" });
  }

  const result = await Calendar.deleteOne({
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
const deleteCalendarEntriesInRange = TryCatch(async (req, res) => {
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

  const result = await Calendar.deleteMany({
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

// Update a calendar entry
const updateCalendarDay = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { jsDate, date, dayOfWeek, month, shifts, holiday } = req.body;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid calendar ID format", 400));
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
  const updatedCalendar = await Calendar.findByIdAndUpdate(
    id,
    {
      jsDate,
      date,
      dayOfWeek,
      month,
      shifts, // Array of ObjectId references
      holiday
    },
    { new: true, runValidators: true }
  ).populate({
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
  });

  if (!updatedCalendar) {
    return next(new ErrorHandler("Calendar not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Calendar updated successfully",
    calendar: updatedCalendar
  });
});

const getCalendar = TryCatch(async (req, res, next) => {

  const { stream, year, date } = req.query;

  if (!stream || !year || !date) {
    return res.status(400).json({ error: "Please provide stream, year, and date." });
  }

  // Split the stream (e.g., 'BSc IT') into name ('BSc') and specialisation ('IT')
  const [name, specialisation] = stream.split(' ');

  // Validate the date format (DD/MM/YYYY)
  const parsedDate = moment(date, 'DD/MM/YYYY');
  if (!parsedDate.isValid()) {
    return res.status(400).json({ error: 'Invalid date format. Please use DD/MM/YYYY.' });
  }

  // Find the Year document based on year
  const yearData = await Year.findOne({ year });

  // Find the Stream document based on name, specialisation, and year
  const streamData = await Stream.findOne({
    name: name,
    specialisation: specialisation,
    year: yearData._id
  });  

  if (!streamData) {
    return res.status(404).json({ message: "No stream found for the provided details." });
  }

  console.log(parsedDate.format('DD/MM/YYYY'));
  

  // Find the Calendar data for the given date and stream
  const dayData = await Calendar.findOne({ date: parsedDate.format('DD/MM/YYYY') })
    .populate({
      path: 'shifts',
      match: { stream: streamData._id },
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
    });

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

module.exports = {
  createYearCalendar,
  createDayOfCalendar,
  deleteAllCalendarEntries,
  deleteCalendarEntryByDate,
  deleteCalendarEntriesInRange,
  updateCalendarDay,
  getCalendar
};
