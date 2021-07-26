const router = require('express').Router();
// const asyncHandler = require('express-async-handler');
// const { User } = require('../../db/models');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const ipasRouter = require('./ipas.js');
const crackOpensRouter = require('./crackOpens.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/ipas', ipasRouter);
router.use('/cracked-open', crackOpensRouter);

module.exports = router;
