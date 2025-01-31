const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require('../MiddleWares/auth.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');
const {
    createYearTimetableSchedule,
    createDayOfTimetableSchedule,
    deleteAllTimetableScheduleEntries,
    deleteTimetableScheduleEntryByDate,
    deleteTimetableScheduleEntriesInRange,
    updateTimetableScheduleDay,
    getTimetableSchedule,
    getAllSchedule,
    getWeeklyTimetable
} = require('../Controllers/timetableSchedule.controller.js');

router.route('/calendar').get(isAuthenticated, verifyRole('admin', 'student'), getTimetableSchedule)
router.route('/schedule').get(isAuthenticated, verifyRole('admin'), getAllSchedule)
router.route('/schedule/week').get(isAuthenticated, verifyRole('admin'), getWeeklyTimetable)
router.route('/calendar').post(isAuthenticated, verifyRole('admin'), createYearTimetableSchedule)
router.route('/schedule/day').post(isAuthenticated, verifyRole('admin'), createDayOfTimetableSchedule)
router.route('/calendar').delete(isAuthenticated, verifyRole('admin'), deleteAllTimetableScheduleEntries)
router.route('/calender-range-delete').delete(isAuthenticated, verifyRole('admin'), deleteTimetableScheduleEntriesInRange)
router.route('/delete-date').delete(isAuthenticated, verifyRole('admin'), deleteTimetableScheduleEntryByDate)
router.route('/schedule/:id').patch(isAuthenticated, verifyRole('admin'), updateTimetableScheduleDay);


module.exports = router;