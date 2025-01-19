const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require('../Middlewares/auth.js');
const { verifyRole } = require('../Middlewares/verifyRole.js');
const {
    createYearTimetableSchedule,
    createDayOfTimetableSchedule,
    deleteAllTimetableScheduleEntries,
    deleteTimetableScheduleEntryByDate,
    deleteTimetableScheduleEntriesInRange,
    updateTimetableScheduleDay,
    getTimetableSchedule
} = require('../Controllers/timetableSchedule.controller.js');

router.route('/calendar').get(isAuthenticated, verifyRole('admin', 'student'), getTimetableSchedule)
router.route('/calendar').post(isAuthenticated, verifyRole('admin'), createYearTimetableSchedule)
router.route('/calendar/day').post(isAuthenticated, verifyRole('admin'), createDayOfTimetableSchedule)
router.route('/calendar').delete(isAuthenticated, verifyRole('admin'), deleteAllTimetableScheduleEntries)
router.route('/calender-range-delete').delete(isAuthenticated, verifyRole('admin'), deleteTimetableScheduleEntriesInRange)
router.route('/delete-date').delete(isAuthenticated, verifyRole('admin'), deleteTimetableScheduleEntryByDate)
router.route('/calendar/:id').patch(isAuthenticated, verifyRole('admin'), updateTimetableScheduleDay);


module.exports = router;