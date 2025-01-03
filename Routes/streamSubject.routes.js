const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllMappings,
    createMapping,
    getMappingByStreamId,
    updateMappingByStreamId,
    deleteMappingByStreamId,   
} = require("../Controllers/streamSubject.controller.js");
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/mapping/stream-subject').get(verifyRole(['admin']), getAllMappings);
router.route('/create-mapping/stream-subject').post(verifyRole(['admin']), createMapping);
router.route('/mapping/stream-subject/:id').get(verifyRole(['admin']), getMappingByStreamId)
.delete(verifyRole(['admin']), deleteMappingByStreamId)
.patch(verifyRole(['admin']), updateMappingByStreamId);

module.exports = router;