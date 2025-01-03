const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllProfessorStreamMappings,
    createProfessorStreamMapping,
    getMappingByProfessorId,
    updateMappingByProfessorId,
    deleteMappingByProfessorId,
} = require("../Controllers/professorStream.controller.js");
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/mapping/professor-stream').get(verifyRole(['admin']), getAllProfessorStreamMappings);
router.route('/create-mapping/professor-stream').post(verifyRole(['admin']), createProfessorStreamMapping);
router.route('/mapping/professor-stream/:id').get(verifyRole(['admin']), getMappingByProfessorId)
.delete(verifyRole(['admin']), deleteMappingByProfessorId)
.patch(verifyRole(['admin']), updateMappingByProfessorId);

module.exports = router;