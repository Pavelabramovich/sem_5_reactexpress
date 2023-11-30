var express = require('express');
var router = express.Router();

const controller = require('../controllers/productController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', checkRole(2), controller.create);

module.exports = router;