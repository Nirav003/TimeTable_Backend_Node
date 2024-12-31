const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSubject, getSubjectById, createSubject,
    updateSubject, deleteSubject
} = require('../Controllers/subject.controller.js');

router.route('/subject').get(isAuthenticated, getAllSubject);
router.route('/create-subject').post(isAuthenticated, createSubject);
router.route('/subject/:id').get(isAuthenticated, getSubjectById)
.patch(isAuthenticated, updateSubject)
.delete(isAuthenticated, deleteSubject);

module.exports = router;