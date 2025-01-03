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

router.use(isAuthenticated);

router.route('/mapping/professor-stream').get(getAllProfessorStreamMappings);
router.route('/create-mapping/professor-stream').post(createProfessorStreamMapping);
router.route('/mapping/professor-stream/:id').get(getMappingByProfessorId)
.delete(deleteMappingByProfessorId)
.patch(updateMappingByProfessorId);

module.exports = router;