const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllYear, createYear, updateYear,
    getYearById, deleteYear
} = require('../Controllers/year.controller.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

router.route('/year').get(isAuthenticated, verifyRole('admin'), getAllYear);
router.route('/create-year').post(isAuthenticated, verifyRole('admin'), createYear);
router.route('/year/:id').get(isAuthenticated, verifyRole('admin'), getYearById)
.patch(isAuthenticated, verifyRole('admin'), updateYear)
.delete(isAuthenticated, verifyRole('admin'), deleteYear);


module.exports = router;