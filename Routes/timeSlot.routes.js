const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSlot, createSlot, getSlotById,
    deleteSlot, updateSlot
} = require('../Controllers/timeSlot.controller.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/timeslot').get(verifyRole('admin'), getAllSlot)
router.route('/create-timeslot').post(verifyRole('admin'), createSlot);
router.route('/timeslot/:id').get(verifyRole('admin'), getSlotById)
.delete(verifyRole('admin'), deleteSlot)
.patch(verifyRole('admin'), updateSlot)

module.exports = router;