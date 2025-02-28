const exp = require('express');
const { isAuthenticated } = require('../MiddleWares/auth.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');
const { addCommitteeMember, removeCommitteeMember } = require('../Controllers/committee-members.controller.js');

const router = exp.Router();

router.use(isAuthenticated, verifyRole('management'));

router.route('/add-members').post(addCommitteeMember);
router.route('/remove-members').delete(removeCommitteeMember);

module.exports = router;