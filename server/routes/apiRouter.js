var express = require('express');
var router = express.Router();

const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');

router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);

module.exports = router;