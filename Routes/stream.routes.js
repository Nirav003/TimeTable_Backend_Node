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
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/stream').get(verifyRole(['admin']), getAllStreams);
router.route('/create-stream').post(verifyRole(['admin']), createStream);
router.route('/stream/:id').get(verifyRole(['admin']), getStreamById)
.delete(verifyRole(['admin']), deleteStream)
.patch(verifyRole(['admin']), updateStream)

module.exports = router;