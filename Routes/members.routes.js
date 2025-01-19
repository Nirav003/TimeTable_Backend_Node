const exp = require('express');
const { getAllMcMembers } = require('../Controllers/member.controller');
const { isAuthenticated } = require('../MiddleWares/auth.js');
const { verifyRole } = require('../MiddleWares/verifyRole.js');

const router = exp.Router();

router.get('/mc-members', isAuthenticated, verifyRole('management'), getAllMcMembers);

module.exports = router;