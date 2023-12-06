var express = require('express');
var router = express.Router();

const controller = require('../controllers/bookController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id/categories', controller.getCategories)
router.get('/:id/providers', controller.getProviders)

router.post('/', checkRole(2), controller.create);
router.patch('/:id', checkRole(2), controller.update);

router.post('/:id/categories', checkRole(2), controller.updateCategories)
router.post('/:id/providers', checkRole(2), controller.updateProviders)

router.delete('/:id', checkRole(2), controller.delete);

module.exports = router;