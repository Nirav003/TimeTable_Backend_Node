const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSubject, getSubjectById, createSubject,
    updateSubject, deleteSubject
} = require('../Controllers/subject.controller.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.route('/subject').get(isAuthenticated, verifyRole(['admin']), getAllSubject);
router.route('/create-subject').post(isAuthenticated, verifyRole(['admin']), createSubject);
router.route('/subject/:id').get(isAuthenticated, verifyRole(['admin']), getSubjectById)
.patch(isAuthenticated, verifyRole(['admin']), updateSubject)
.delete(isAuthenticated, verifyRole(['admin']), deleteSubject);

module.exports = router;