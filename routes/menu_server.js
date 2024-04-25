/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-24 21:27:22
 * @FilePath: \EspressoKoaServer\routes\menu_server.js
 * @Description: 菜单服务-接口路由
 */

const Router = require('koa-router');
const { getMenuList, createMenu, getAuthBtns } = require('../apis/menuListApi');
const router = new Router;


/**
 * @swagger
 * /coffee/menu/list:
 *   get:
 *     summary: 菜单目录列表
 *     description: 返回系统菜单目录
 *     tags: [菜单管理]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 查询系统菜单成功
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/menu/list', getMenuList);

router.post("/coffee/menu/create", createMenu);

/**
 * @swagger
 * /coffee/auth/buttons:
 *   get:
 *     summary: 系统权限按钮
 *     description: 返回系统权限按钮
 *     tags: [菜单管理]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 权限按钮查询返回成功
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/auth/buttons', getAuthBtns);

/**
 * @swagger
 * /coffee/apis/lists:
 *   get:
 *     summary: 并行请求测试接口
 *     description: 获取三个接口的数组，用作前端并行请求的测试使用
 *     tags: [菜单管理]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 请求三个接口的数组成功
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/apis/lists', async (ctx, next) => {
  ctx.response.body = {
    code: 200,
    data: [
      '/coffee/menu/list',
      '/coffee/user/user-all-info',
      '/coffee/list',
    ],
    concurrentQuantity: 4,
    message: '请求三个接口的数组成功'
  }
});

module.exports = router;
