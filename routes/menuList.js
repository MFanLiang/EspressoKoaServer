const Router = require('koa-router');
const { getMenuList, getAuthBtns } = require('../apis/menuListApi');
const { useDelay } = require('../utils');

const router = new Router;

/**
 * @swagger
 * tags:
 *    name: 菜单管理
 *    desription: Menu management
 */

router.post('/coffee/menu/list', getMenuList);

router.get('/coffee/auth/buttons', getAuthBtns);

router.get('/coffee/apis/lists', async (ctx, next) => {
  await useDelay(1000);
  ctx.response.body = {
    code: 200,
    data: [
      '/coffee/menu/list',
      '/coffee/user/user-all-info',
      '/coffee/list',
    ],
    concurrentQuantity: 4,
    message: '请求三个接口的数组正常'
  }
});

module.exports = router;
