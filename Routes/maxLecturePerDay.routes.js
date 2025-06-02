const exp = require('express');
const { isAuthenticated } = require('../MiddleWares/auth.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');
const { createMaxLecturesPerDay, deleteMaxLecturesPerDay, getAllMaxLecturesPerDay, getMaxLecturesPerDay, updateMaxLecturesPerDay } = require('../Controllers/maxLecturesPerDay.controller.js');

const router = exp.Router();

router.post('/create-max-lec', isAuthenticated, verifyRole('admin'), createMaxLecturesPerDay);
router.get('/', isAuthenticated, verifyRole('admin'), getAllMaxLecturesPerDay);
router.get('/:id', isAuthenticated, verifyRole('admin'), getMaxLecturesPerDay);
router.patch('/:id', isAuthenticated, verifyRole('admin'), updateMaxLecturesPerDay);
router.delete('/:id', isAuthenticated, verifyRole('admin'), deleteMaxLecturesPerDay);

module.exports = router;