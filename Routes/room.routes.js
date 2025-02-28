const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllRoom,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
} = require("../Controllers/room.controller.js");
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/rooms').get(verifyRole('admin'), getAllRoom);
router.route('/create-room').post(verifyRole('admin'), createRoom);
router.route('/room/:id').get(verifyRole('admin'), getRoomById)
.delete(verifyRole('admin'), deleteRoom)
.patch(verifyRole('admin'), updateRoom)

module.exports = router;