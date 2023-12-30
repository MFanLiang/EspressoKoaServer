const Router = require('koa-router');
const {
  register,
  login,
  getPointerUserInfo,
  getAllUser,
  updatePointerUser,
  delPointerUser,
  fuzzyQuery
} = require('../apis/userApi');

const router = new Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/:id', getPointerUserInfo);
router.post('/user/user-all-info', getAllUser);
router.put('/user', updatePointerUser)
router.del('/user', delPointerUser);
router.post('/user/fuzzyquery', fuzzyQuery);

module.exports = router;
