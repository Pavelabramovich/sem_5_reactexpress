var express = require('express');
var router = express.Router();

const controller = require('../controllers/roleController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/', controller.getAll);
router.post('/', checkRole(2), controller.create);

module.exports = router;