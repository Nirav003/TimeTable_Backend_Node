const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const { 
  getAllLectures,
  createLecture,
  getLectureById,
  deleteLecture,
  updateLecture
} = require("../Controllers/lecture.controller.js");
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/lectures').get(verifyRole('admin'), getAllLectures);
router.route('/create-lecture').post(verifyRole('admin'), createLecture);
router.route('/lecture/:id').get(verifyRole('admin'), getLectureById)
.delete(verifyRole('admin'), deleteLecture)
.patch(verifyRole('admin'), updateLecture);

module.exports = router;