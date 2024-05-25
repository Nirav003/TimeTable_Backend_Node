const exp = require('express');
const router = exp.Router();
const {getServerStatus} = require('../Controllers/test.controller');

router.route('/').get(getServerStatus)


module.exports = router;