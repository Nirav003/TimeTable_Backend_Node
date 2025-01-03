const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllShifts,getShiftById ,createShift,
    updateShift, deleteShift
} = require("../Controllers/shift.controller.js");
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.route('/shift').get(isAuthenticated, verifyRole(['admin']), getAllShifts);
router.route('/create-shift').post(isAuthenticated, verifyRole(['admin']), createShift);
router.route('/shift/:id').get(isAuthenticated, verifyRole(['admin']), getShiftById)
.patch(isAuthenticated, verifyRole(['admin']), updateShift)
.delete(isAuthenticated, verifyRole(['admin']), deleteShift);

module.exports = router;