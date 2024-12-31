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

router.use(isAuthenticated);

router.route('/mapping').get(getAllMappings);
router.route('/create-mapping').post(createMapping);
router.route('/mapping/:id').get(getMappingByStreamId)
.delete(deleteMappingByStreamId)
.patch(updateMappingByStreamId);

module.exports = router;