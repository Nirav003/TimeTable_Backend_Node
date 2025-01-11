const exp = require('express');
const { getAllMcMembers } = require('../Controllers/member.controller');
const { isAuthenticated } = require('../Middlewares/auth.js');
const { verifyRole } = require('../Middlewares/verifyRole.js');

const router = exp.Router();

router.get('/mc-members', isAuthenticated, verifyRole('management'), getAllMcMembers);

module.exports = router;