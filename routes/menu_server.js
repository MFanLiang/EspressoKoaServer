/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-27 01:00:08
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
 *     parameters:
 *       - in: query
 *         name: 'user_role'
 *         schema:
 *           type: number
 *         description: 用户角色，可以是number或string数据格式，尽量传递number数据格式
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           appliaction/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int64
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: 数据唯一id
 *                         example: '42652346345745674'
 *                       title:
 *                         type: string
 *                         description: 路由名称
 *                         example: "首页"
 *                       path:
 *                         type: string
 *                         description: 路由路径地址
 *                         example: '/home/index'
 *                       icon:
 *                         type: string
 *                         description: 路由icon图标，遵循Ant Desgin icon组件命名规则
 *                         example: 'HomeOutlined'
 *                       status:
 *                         type: number
 *                         description: 路由状态 (1 可用状态，0 不可用状态)
 *                         example: 1
 *                       parent_menu_id:
 *                         type: string
 *                         description: 指向父级分类的ID，如果是父级分类则为null，如果是子分类则为父级分类的ID
 *                         example: null
 *                       subordinate_role:
 *                         type: number
 *                         description: 隶属角色
 *                         example: 0
 *                       sort:
 *                         type: number
 *                         description: 菜单排序的序列
 *                         example: 1
 *                       isLink:
 *                         type: string
 *                         description: 链接地址，可选项，若路由地址不存在，则为null
 *                         example: null
 *                 message:
 *                   type: string
 *                   example: "查询系统菜单成功"
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/menu/list', getMenuList);

/**
 * @swagger
 *   /coffee/menu/create:
 *     post:
 *       summary: 新建菜单
 *       description: 创建一个新的菜单路由
 *       tags: [菜单管理]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: "请求入参描述"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 路由名称标题，名称必须是唯一的
 *                 alias:
 *                   type: string
 *                   description: 路由的路径地址
 *                 icon:
 *                   type: string
 *                   description: 路由icon图标，填入的icon须遵循 Ant Desgin icon组件命名规范
 *                 sort:
 *                   type: number
 *                   description: 菜单排序序列
 *                 status:
 *                   type: boolean
 *                   description: 路由状态 (1 可用状态，0 不可用状态)
 *                 parent_menu_id:
 *                   type: null | string
 *                   description: 指向父级分类的ID，如果是父级分类则为null，如果是子分类则为父级分类的ID
 *                 subordinate_role:
 *                   type: number
 *                   description: 隶属角色
 *               example:
 *                 name: 首页
 *                 alias: '/home/index'
 *                 icon: 'HomeOutlined'
 *                 sort: 0
 *                 status: 1
 *                 parent_menu_id: null
 *                 subordinate_role: 0
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 路由名称标题，名称必须是唯一的
 *                 alias:
 *                   type: string
 *                   description: 路由的路径地址
 *                 icon:
 *                   type: string
 *                   description: 路由icon图标，填入的icon须遵循 Ant Desgin ic on组件命名规范
 *                 sort:
 *                   type: number
 *                   description: 菜单排序序列
 *                 status:
 *                   type: boolean
 *                   description: 路由状态 (1 可用状态，0 不可用状态)
 *                 parent_menu_id:
 *                   type: null | string
 *                   description: 指向父级分类的ID，如果是父级分类则为null，如 果是子分类则为父级分类的ID
 *                 subordinate_role:
 *                   type: number
 *                   description: 隶属角色
 *               required:
 *                 - name
 *                 - alias
 *                 - icon
 *                 - subordinate_role
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: integer
 *                     format: int64
 *                     example: 200
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: 数据项唯一id
 *                         example: '22de27f0'
 *                       name:
 *                         type: string
 *                         description: 路由名称标题，名称必须是唯一的
 *                       alias:
 *                         type: string
 *                         description: 路由的路径地址
 *                       icon:
 *                         type: string
 *                         description: 路由icon图标，填入的icon须遵循 Ant Desgin ic on组件命名规范
 *                       sort:
 *                         type: number
 *                         description: 菜单排序序列
 *                       status:
 *                         type: boolean
 *                         description: 路由状态 (1 可用状态，0 不可用状态)
 *                       parent_menu_id:
 *                         type: string
 *                         description: 指向父级分类的ID，如果是父级分类则为null，如 果是子分类则为父级分类的ID
 *                       subordinate_role:
 *                         type: number
 *                         description: 隶属角色
 *                       isLink:
 *                         type: string
 *                         description: 链接地址，可选项，若路由地址不存在，则为null
 *                       create_time:
 *                         type: string
 *                       update_time:
 *                          type: string
 *                   message:
 *                     type: string
 *                     example: 新建菜单操作成功
 *         '400':
 *           description: 请求参数错误
 *         '401':
 *           description: Protected resource, use Authorization header to get access
 *         '404':
 *           description: 请求资源未找到
 */
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
