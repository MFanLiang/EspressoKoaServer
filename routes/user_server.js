/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-11-23 21:46:40
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 11:27:38
 * @FilePath: \koa-generator\routes\user_server.js
 * @Description: 用户操作管理服务-接口路由
 */

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

/**
 * @swagger
 * /coffee/user/register:
 *   post:
 *     summary: 新用户注册
 *     description: 注册新的用户账户信息，用于登录系统
 *     tags: [用户管理]
 *     requestBody:
 *       description: "注册需要的请求参数"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: 'string'
 *                 description: 用户唯一主键，autocreate
 *               username:
 *                 type: 'string'
 *                 description: 用户名
 *                 required: true
 *               password:
 *                 type: 'string'
 *                 description: 密码
 *               user_full_name:
 *                 type: 'string'
 *                 description: 用户全名
 *               use_role:
 *                 type: 'number'
 *                 description: 用户角色
 *               avatar:
 *                 type: 'string'
 *                 description: 头像
 *               tel:
 *                 type: 'string'
 *                 description: 手机号码
 *               status:
 *                 type: 'boolean'
 *                 description: 用户账号状态
 *             example:
 *               username: 'user'
 *               password: '*********'
 *               user_full_name: 'userFullName'
 *               tel: '139********'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               username:
 *                 type: 'string'
 *                 description: 用户名
 *               password:
 *                 type: 'string'
 *                 description: 密码
 *               user_full_name:
 *                 type: 'string'
 *                 description: 用户全名
 *               use_role:
 *                 type: 'number'
 *                 description: 用户角色
 *               avatar:
 *                 type: 'string'
 *                 description: 头像
 *               tel:
 *                 type: 'string'
 *                 description: 手机号码
 *               status:
 *                 type: 'boolean'
 *                 description: 用户账号状态
 *             required:
 *               - username
 *               - password
 *               - user_full_name
 *               - tel
 *     responses:
 *       200:
 *         description: Ok
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/register', register);

/**
 * @swagger
 * /coffee/user/login:
 *   post:
 *     summary: 用户登录系统
 *     description: 用户登录系统
 *     tags: [用户管理]
 *     requestBody:
 *       description: "登录所需要的请求参数"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: 'string'
 *                 description: 用户名
 *               password:
 *                 type: 'string'
 *                 description: 密码
 *             example:
 *               username: 'root'
 *               password: '123456'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               username:
 *                 type: 'string'
 *                 description: 用户名
 *               password:
 *                 type: 'string'
 *                 description: 密码
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Ok
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/login', login);

router.get('/coffee/user/:id', getPointerUserInfo);

// /**
//  * @swagger
//  * /user/user-all-info:
//  *   post:
//  *     summary: 获取所有用户信息列表
//  *     description: 获取所有用户信息列表
//  *     tags: [用户管理]
//  *     produces:
//  *       - application/json
//  *     parameters: # 请求参数
//  *       - name: userName
//  *         description: 用户名.
//  *         required: false
//  *         in: query # 参数的位置，可以设置的值有 query|header|path| cookie|formData 等
//  *         type: string # 入参的类型，可以设置的值有 string|number|file(文件) 等
//  *       - name: password
//  *         description: 密码.
//  *         in: query
//  *         required: false
//  *         type: string
//  *       - name: userFullName
//  *         description: 用户全名
//  *         in: query
//  *         required: false
//  *         type: string
//  *       - name: avatar
//  *         description: 用户头像
//  *         in: query
//  *         required: false
//  *         type: string
//  *       - name: tel
//  *         description: 用户的手机号码
//  *         in: query
//  *         required: false
//  *         type: number
//  *       - name: status
//  *         description: 用户状态
//  *         in: query
//  *         required: false
//  *         type: number
//  *     responses:
//  *       200:
//  *         description: Ok
//  *         schema:
//  *           type: object
//  *         properties:
//  *           code:
//  *            type: 'number'
//  *            description: 状态码
//  *           data:
//  *            type: 'array'
//  *            description: 用户列表
//  *           message:
//  *            type: 'string'
//  *            description: 反馈信息
//  *           total:
//  *            type: 'number'
//  *            description: 总数
//  *           currentPage:
//  *            type: 'number'
//  *            description: 当前页数
//  *           pageSize:
//  *            type: 'number'
//  *            description: 总页数
//  *       '400':
//  *         description: 请求参数错误
//  *       '401':
//  *         description: Protected resource, use Authorization header to get access
//  *       '404':
//  *         description: 请求资源未找到
//  * 
//  */
// router.post('/coffee/user/user-all-info', getAllUser);

// router.put('/coffee/user', updatePointerUser);

// router.del('/coffee/user', delPointerUser);

// router.post('/coffee/user/fuzzyquery', fuzzyQuery);

module.exports = router;
