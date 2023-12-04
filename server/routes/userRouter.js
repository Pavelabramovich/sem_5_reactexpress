var express = require('express');
var router = express.Router();

const controller = require('../controllers/userController');
const auth = require('../middlewares/checkAuthMiddleware');

router.post('/registration', controller.register)
router.post('/login', controller.login)

router.get('/auth', auth, controller.isAuthorized);

router.get('/time', controller.time);

module.exports = router;