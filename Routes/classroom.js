const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const { 
    createClassroom,
    getAllClassroom,
    getClassroomById,
    updateClassroom,
    deleteClassroom
} = require("../Controllers/classroom.js");

router.use(isAuthenticated);

router.route('/all-classroom').get(getAllClassroom);
router.route('/create-classroom').post(createClassroom);
router.route('/classroom/:id').get(getClassroomById)
.delete(deleteClassroom)
.put(updateClassroom)

module.exports = router;