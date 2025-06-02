const exp = require('express');
const router = exp.Router();
const { isAuthenticated } = require('../MiddleWares/auth.js')
const { verifyRole } = require('../MiddleWares/verifyRole.js');
const {
    createCommittee, 
    updateCommittee, 
    deleteCommittee, 
    getAllCommittee, 
    getCommitteeById
} = require('../Controllers/committee.controller.js');

router.use(isAuthenticated);

router.route('/committee').get(verifyRole('management'), getAllCommittee);
router.route('/create-committee').post(verifyRole('management'), createCommittee);
router.route('/committee/:id').get(verifyRole('management'), getCommitteeById)
    .patch(verifyRole('management'), updateCommittee)
    .delete(verifyRole('management'), deleteCommittee);

module.exports = router;