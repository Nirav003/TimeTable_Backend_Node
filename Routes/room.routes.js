const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllRoom,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
} = require("../Controllers/room.controller.js")

router.use(isAuthenticated);

router.route('/rooms').get(getAllRoom);
router.route('/create-room').post(createRoom);
router.route('/room/:id').get(getRoomById)
.delete(deleteRoom)
.patch(updateRoom)

module.exports = router;