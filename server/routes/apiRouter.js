var express = require('express');
var router = express.Router();

const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;