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

router.use(isAuthenticated);

router.route('/lectures').get(getAllLectures);
router.route('/create-lecture').post(createLecture);
router.route('/lecture/:id').get(getLectureById)
.delete(deleteLecture)
.patch(updateLecture);

module.exports = router;