const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const messageRouter = require('./messageRouter');

router.use(userRouter);
router.use(postRouter);
router.use(messageRouter);

module.exports = router;
