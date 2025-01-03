const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    createYearCalendar, deleteAllCalendarEntries,
    deleteCalendarEntriesInRange, deleteCalendarEntryByDate,
    createDayOfCalendar, updateCalendarDay
} = require('../Controllers/calendar.controller.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.route('/calendar').post(isAuthenticated, verifyRole(['admin']), createYearCalendar)
router.route('/calendar/day').post(isAuthenticated, verifyRole(['admin']), createDayOfCalendar)
router.route('/calendar').delete(isAuthenticated, verifyRole(['admin']), deleteAllCalendarEntries)
router.route('/calender-range-delete').delete(isAuthenticated, verifyRole(['admin']), deleteCalendarEntriesInRange)
router.route('/delete-date').delete(isAuthenticated, verifyRole(['admin']), deleteCalendarEntryByDate)
router.route('/calendar/:id').patch(isAuthenticated, verifyRole(['admin']), updateCalendarDay);


module.exports = router;