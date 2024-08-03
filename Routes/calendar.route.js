const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    createYearCalendar, deleteAllCalendarEntries,
    deleteCalendarEntriesInRange, deleteCalendarEntryByDate,
    createDayOfCalendar
} = require('../Controllers/calendar.controller.js');

router.route('/calendar').post(isAuthenticated, createYearCalendar)
router.route('/calendar/day').post(isAuthenticated, createDayOfCalendar)
.delete(isAuthenticated, deleteAllCalendarEntries)
router.route('/calender-range-delete').delete(isAuthenticated, deleteCalendarEntriesInRange)
router.route('/delete-date').delete(isAuthenticated, deleteCalendarEntryByDate)


module.exports = router;