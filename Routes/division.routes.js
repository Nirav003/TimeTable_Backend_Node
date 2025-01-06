const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require('../MiddleWares/auth.js')
const {
    getAllDivisions,
    createDivision,
    getDivisionById,
    updateDivision,
    deleteDivision
} = require('../Controllers/division.controller.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.use(isAuthenticated);

router.route('/division').get(verifyRole('admin'), getAllDivisions);
router.route('/create-division').post(verifyRole('admin'), createDivision);
router.route('/division/:id').get(verifyRole('admin'), getDivisionById)
    .patch(verifyRole('admin'), updateDivision)
    .delete(verifyRole('admin'), deleteDivision);

module.exports = router;