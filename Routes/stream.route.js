const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllStreams,
    createStream,
    getStreamById,
    updateStream,
    deleteStream
} = require('../Controllers/stream.controller.js');

router.use(isAuthenticated);

router.route('/stream').get(getAllStreams);
router.route('/create-stream').post(createStream);
router.route('/stream/:id').get(getStreamById)
.delete(deleteStream)
.put(updateStream)

module.exports = router;