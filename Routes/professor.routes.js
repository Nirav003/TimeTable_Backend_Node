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
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/professor').get(verifyRole('admin'), getAllProfessor);
router.route('/create-professor').post(verifyRole('admin'), createProfessor);
router.route('/professor/:id').get(verifyRole('admin'), getProfessorById)
    .patch(verifyRole('admin'), updateProfessor)
    .delete(verifyRole('admin'), deleteProfessor);

module.exports = router;