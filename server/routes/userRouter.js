var express = require('express');
var router = express.Router();

const controller = require('../controllers/userController');
const auth = require('../middlewares/checkAuthMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');



router.post('/registration', controller.register)
router.post('/login', controller.login)

router.get('/auth', auth, controller.isAuthorized);

router.get('/', controller.getAll);
router.get('/providers', controller.getProviders);
router.get('/:id', controller.getById);

router.patch('/:id', checkRole(2), controller.update);
router.delete('/:id', checkRole(2), controller.delete);

router.get('/:id/cart', auth, controller.getUserCartItems)

router.get('/:id/provider', controller.isProvider);
router.post('/:id/provider', controller.addProvider);
router.delete('/:id/provider', controller.removeProvider);

router.post(`/:userId/cart/:bookId`, controller.addBookToCart);
router.delete(`/:userId/cart/:bookId`, controller.removeBookFromCart);
 
router.get('/:userId/orders', controller.getOrders);
router.post(`/:userId/order`, controller.fullOrder);

router.get('/review/:bookId', controller.getReviews);
router.post('/review/:userId/:bookId', controller.createReview)

router.get('/orderInfo/:orderId', controller.getOrderInfo);


module.exports = router;