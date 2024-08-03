const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSlot, createSlot, getSlotById,
    deleteSlot, updateSlot
} = require('../Controllers/slot.controller');

router.use(isAuthenticated);

router.route('/all-slot').get(getAllSlot);
router.route('/create-slot').post(createSlot);
router.route('/slot/:id').get(getSlotById)
.delete(deleteSlot)
.put(updateSlot)

module.exports = router;