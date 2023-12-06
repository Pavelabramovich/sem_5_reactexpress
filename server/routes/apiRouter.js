var express = require('express');
var router = express.Router();

const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const categoryRouter = require('./categoryRouter');
const couponRouter = require('./couponRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/category', categoryRouter);
router.use('/coupon', couponRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;