const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSlot, createSlot, getSlotById,
    deleteSlot, updateSlot
} = require('../Controllers/slot.controller');

router.route('/all-slot').get(isAuthenticated ,getAllSlot);
router.route('/create-slot').post(isAuthenticated ,createSlot);
router.route('/slot/:id').get(isAuthenticated, getSlotById)
.delete(isAuthenticated, deleteSlot)
.put(isAuthenticated, updateSlot)

module.exports = router;