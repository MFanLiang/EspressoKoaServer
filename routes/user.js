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
 * tags:
 *    name: 用户管理
 *    desription: User management
 */

router.post('/coffee/user/register', register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: 用户登录系统
 *     description: 用户登录系统
 *     tags: [用户管理]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: 用户名.
 *         required: true
 *         in: body # 参数的位置，可以设置的值有 query|header|path| cookie|formData 等
 *         type: string # 入参的类型，可以设置的值有 string|number|file(文件) 等
 *       - name: password
 *         description: 密码.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           type: object
 *         properties:
 *           code:
 *            type: 'number'
 *            description: 状态码
 *           data:
 *            type: 'array'
 *            description: 用户列表
 *           message:
 *            type: 'string'
 *            description: 反馈信息
 *           total:
 *            type: 'number'
 *            description: 总数
 *           currentPage:
 *            type: 'number'
 *            description: 当前页数
 *           pageSize:
 *            type: 'number'
 *            description: 总页数
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/login', login);
router.get('/coffee/user/:id', getPointerUserInfo);

/**
 * @swagger
 * /user/user-all-info:
 *   post:
 *     summary: 获取所有用户信息列表
 *     description: 获取所有用户信息列表
 *     tags: [用户管理]
 *     produces:
 *       - application/json
 *     parameters: # 请求参数
 *       - name: userName
 *         description: 用户名.
 *         required: false
 *         in: query # 参数的位置，可以设置的值有 query|header|path| cookie|formData 等
 *         type: string # 入参的类型，可以设置的值有 string|number|file(文件) 等
 *       - name: password
 *         description: 密码.
 *         in: query
 *         required: false
 *         type: string
 *       - name: userFullName
 *         description: 用户全名
 *         in: query
 *         required: false
 *         type: string
 *       - name: avatar
 *         description: 用户头像
 *         in: query
 *         required: false
 *         type: string
 *       - name: tel
 *         description: 用户的手机号码
 *         in: query
 *         required: false
 *         type: number
 *       - name: status
 *         description: 用户状态
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: Ok
 *         schema:
 *           type: object
 *         properties:
 *           code:
 *            type: 'number'
 *            description: 状态码
 *           data:
 *            type: 'array'
 *            description: 用户列表
 *           message:
 *            type: 'string'
 *            description: 反馈信息
 *           total:
 *            type: 'number'
 *            description: 总数
 *           currentPage:
 *            type: 'number'
 *            description: 当前页数
 *           pageSize:
 *            type: 'number'
 *            description: 总页数
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 * 
 */
router.post('/coffee/user/user-all-info', getAllUser);

router.put('/coffee/user', updatePointerUser);

router.del('/coffee/user', delPointerUser);

router.post('/coffee/user/fuzzyquery', fuzzyQuery);

module.exports = router;
