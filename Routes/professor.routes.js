const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require('../MiddleWares/auth.js')
const {
    getAllProfessor, 
    createProfessor, 
    updateProfessor,
    getProfessorById, 
    deleteProfessor
} = require('../Controllers/professor.controller.js');

router.use(isAuthenticated);

router.route('/professor').get(getAllProfessor);
router.route('/create-professor').post(createProfessor);
router.route('/professor/:id').get(getProfessorById)
    .patch(updateProfessor)
    .delete(deleteProfessor);

module.exports = router;