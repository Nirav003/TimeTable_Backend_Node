const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require("../MiddleWares/auth.js");
const {
    getAllYear, createYear, updateYear,
    getYearById, deleteYear
} = require('../Controllers/year.controller.js');

router.route('/year').get(isAuthenticated ,getAllYear);
router.route('/create-year').post(isAuthenticated, createYear);
router.route('/year/:id').get(isAuthenticated, getYearById)
.patch(isAuthenticated, updateYear)
.delete(isAuthenticated, deleteYear);


module.exports = router;