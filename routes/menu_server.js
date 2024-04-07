/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 21:40:27
 * @FilePath: \koa-generator\routes\menu_server.js
 * @Description: 菜单服务-接口路由
 */

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
