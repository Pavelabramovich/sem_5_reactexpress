var express = require('express');
var router = express.Router();

const controller = require('../controllers/userController');

router.get('/registration', controller.register)
router.post('/login', controller.login)

router.get('/auth', controller.isAuthorized);

module.exports = router;