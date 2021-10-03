const Router = require('express');
const router = new Router();

const postRouter = require('./postRouter');
const messageRouter = require('./messageRouter');
const authRouter = require('./authRouter');


router.use(postRouter);
router.use(messageRouter);
router.use(authRouter);

module.exports = router;
