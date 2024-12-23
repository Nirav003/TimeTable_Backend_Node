const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllSubject, getSubjectById, createSubject,
    updateSubject, deleteSubject
} = require('../Controllers/subject.controller.js');

router.route('/subjects').get(isAuthenticated, getAllSubject);
router.route('/subject').post(isAuthenticated, createSubject);
router.route('/subject/:id').get(isAuthenticated, getSubjectById)
.patch(isAuthenticated, updateSubject)
.delete(isAuthenticated, deleteSubject);

module.exports = router;