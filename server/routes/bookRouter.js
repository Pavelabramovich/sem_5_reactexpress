var express = require('express');
var router = express.Router();

const controller = require('../controllers/bookController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', checkRole(2), controller.create);
router.patch('/:id', checkRole(2), controller.update);

router.delete('/:id', checkRole(2), controller.delete);

module.exports = router;