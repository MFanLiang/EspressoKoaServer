/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-11-23 21:46:40
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-30 14:21:11
 * @FilePath: \EspressoKoaServer\routes\user_server.js
 * @Description: 用户操作管理服务-接口路由
 */

const Router = require('koa-router');
const {
  register,
  login,
  logout,
  generatePublicKey,
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
 *       description: "注册请求参数"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: 'string'
 *                 description: 用户唯一主键，autocreate
 *               userName:
 *                 type: 'string'
 *                 description: 用户名
 *                 required: true
 *               passWord:
 *                 type: 'string'
 *                 description: 密码
 *               userFullName:
 *                 type: 'string'
 *                 description: 用户全名
 *               userRole:
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
 *               userName: 'user'
 *               passWord: '*********'
 *               userFullName: 'userFullName'
 *               tel: '139********'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               userName:
 *                 type: 'string'
 *                 description: 用户名
 *               passWord:
 *                 type: 'string'
 *                 description: 密码
 *               userFullName:
 *                 type: 'string'
 *                 description: 用户全名
 *               userRole:
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
 *               - userName
 *               - passWord
 *               - userFullName
 *               - tel
 *     responses:
 *       200:
 *         description: Ok
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 数据唯一id
 *                     userName:
 *                       type: string
 *                       description: 用户名
 *                     avatar:
 *                       type: string
 *                       description: 用户头像图片地址
 *                     tel:
 *                       type: string
 *                       description: 用户手机号码
 *                     userRole:
 *                       type: number
 *                       description: 用户隶属角色
 *                     status:
 *                       type: boolean
 *                       description: 用户账户状态
 *                     createTime:
 *                       type: string
 *                       description: 创建时间
 *                     updateTime:
 *                       type: string
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 用户创建成功
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
 *       description: "登录请求参数"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: 'string'
 *                 description: 用户名
 *               passWord:
 *                 type: 'string'
 *                 description: 密码
 *             example:
 *               userName: 'root'
 *               passWord: '123456'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               userName:
 *                 type: 'string'
 *                 description: 用户名
 *               passWord:
 *                 type: 'string'
 *                 description: 密码
 *             required:
 *               - userName
 *               - passWord
 *     responses:
 *       '200':
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
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: 访问令牌
 *                       example: 'xxxxxxxx'
 *                     expiresIn:
 *                       type: string
 *                       description: 令牌有效时长
 *                       example: '10h'
 *                     tokenType:
 *                       type: string
 *                       description: 令牌类型
 *                       example: 'Bearer'
 *                     userInfo:
 *                       type: object
 *                       description: 用户信息
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 数据唯一id
 *                           example: 'xxxxxxxx'
 *                         userName:
 *                           type: string
 *                           description: 用户名
 *                           example: admin
 *                         avatar:
 *                           type: string
 *                           description: 用户头像图片地址
 *                           example: 'https://exmaple.png'
 *                         tel:
 *                           type: string
 *                           description: 用户手机号码
 *                           example: 14*****
 *                         userRole:
 *                           type: number
 *                           description: 用户隶属角色
 *                           example: 1
 *                         status:
 *                           type: boolean
 *                           description: 用户账户状态
 *                           example: true
 *                         createTime:
 *                           type: string
 *                           description: 创建时间
 *                           example: '2023-04-05T12:22:31, 000Z'
 *                         updateTime:
 *                           type: string
 *                           description: 更新时间
 *                           example: '2023-04-05T12:22:31, 000Z'
 *                     message:
 *                       type: string
 *                       example: '操作成功'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/login', login);

/**
 * @swagger
 * /coffee/user/logout:
 *   post:
 *     summary: 退出登录
 *     description: 用户的退出登录操作
 *     tags: [用户管理]
 *     responses:
 *       '200':
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
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: '操作成功'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to g ac  cess
 *       '404':
 *         description: 请求资源未找到
 */
router.post("/coffee/user/logout", logout);

/**
 * @swagger
 * /coffee/security/publicKey:
 *   get:
 *     summary: 生成公钥
 *     description: 生成系统公钥
 *     tags: [用户管理]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int64
 *                   example: 200
 *                 data:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "操作成功"
 */
router.get("/coffee/security/publicKey", generatePublicKey);

/**
 * @swagger
 * /coffee/user/pointer-info:
 *   get:
 *     summary: 读指定的用户
 *     description: 获取指定的个人用户信息
 *     tags: [用户管理]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: "id"
 *         schema:
 *           type: string
 *         required: true
 *         description: Numberice ID of the user_manager to ready
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int64
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 数据项唯一id
 *                       example: '23eosis200'
 *                     userName:
 *                       type: string
 *                       description: 用户姓名
 *                       example: 'root'
 *                     userFullName:
 *                       type: string
 *                       description: 用户全名称
 *                       example: '超级管理员'
 *                     userRole:
 *                       type: number
 *                       description: 用户角色
 *                       example: 3
 *                     avatar:
 *                       type: string
 *                       description: 用户头像
 *                       example: 'http://example/static/img.png'
 *                     tel:
 *                       type: string
 *                       description: 用户手机号码
 *                       example: 13239844923
 *                     status:
 *                       type: boolean
 *                       description: 用户状态（true[0] 可用状态，false[1] 注销不可用状态）
 *                       example: true
 *                     createTime:
 *                       type: string
 *                       description: 创建时间
 *                     updateTIme:
 *                       type: string
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 指定用户信息查询完成
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/user/pointer-info', getPointerUserInfo);

/**
 * @swagger
 * /coffee/user/user-all-info:
 *   get:
 *     summary: 读所有用户
 *     description: 读取系统中所有用户
 *     tags: [用户管理]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
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
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: 数据项唯一id
 *                         example: '23eosis200'
 *                       userName:
 *                         type: string
 *                         description: 用户姓名
 *                         example: 'root'
 *                       userFullName:
 *                         type: string
 *                         description: 用户全名称
 *                         example: '超级管理员'
 *                       userRole:
 *                         type: number
 *                         description: 用户角色
 *                         example: 3
 *                       avatar:
 *                         type: string
 *                         description: 用户头像
 *                         example: 'http://example/static/img.png'
 *                       tel:
 *                         type: string
 *                         description: 用户手机号码
 *                         example: 13239844923
 *                       status:
 *                         type: boolean
 *                         description: 用户状态（true[1] 可用状态，false[0] 注销不可用状态）
 *                         example: true
 *                       createTime:
 *                         type: string
 *                         description: 创建时间
 *                       updateTime:
 *                         type: string
 *                         description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 查询所有用户信息已完成
 *                 total:
 *                   type: number
 *                   example: 1
 *                 pageSize:
 *                   type: number
 *                   example: 10
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get('/coffee/user/user-all-info', getAllUser);

/**
 * @swagger
 * /coffee/user:
 *   put:
 *     summary: 更新用户
 *     description: 更新指定的用户
 *     tags: [用户管理]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: '请求入参描述'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: 'string'
 *                 required: true
 *                 description: 数据唯一id
 *               userName:
 *                 type: string
 *                 description: 用户姓名
 *                 example: 'root'
 *               userFullName:
 *                 type: string
 *                 description: 用户全名称
 *                 example: '超级管理员'
 *               userRole:
 *                 type: number
 *                 description: 用户角色
 *                 example: 3
 *               avatar:
 *                 type: string
 *                 description: 用户头像
 *                 example: 'http://example/static/img.png'
 *               tel:
 *                 type: string
 *                 description: 用户手机号码
 *                 example: 13239844923
 *               status:
 *                 type: boolean
 *                 description: 用户状态（true[0] 可用状态，false[1] 注销不可用状态）
 *                 example: true
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               id:
 *                 type: 'string'
 *                 required: true
 *                 description: 数据唯一id
 *               userName:
 *                 type: string
 *                 description: 用户姓名
 *               userFullName:
 *                   type: string
 *                   description: 用户全名称
 *               userRole:
 *                 type: number
 *                 description: 用户角色
 *               avatar:
 *                 type: string
 *                 description: 用户头像
 *               tel:
 *                 type: string
 *                 description: 用户手机号码
 *               status:
 *                 type: boolean
 *                 description: 用户状态（true[0] 可用状态，false[1] 注销不可用状态）
 *             required:
 *               - id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int64
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: 数据项唯一id
 *                       example: '23eosis200'
 *                     userName:
 *                       type: string
 *                       description: 用户姓名
 *                       example: 'root'
 *                     userFullName:
 *                       type: string
 *                       description: 用户全名称
 *                       example: '超级管理员'
 *                     userRole:
 *                       type: number
 *                       description: 用户角色
 *                       example: 3
 *                     avatar:
 *                       type: string
 *                       description: 用户头像
 *                       example: 'http://example/static/img.png'
 *                     tel:
 *                       type: string
 *                       description: 用户手机号码
 *                       example: 13239844923
 *                     status:
 *                       type: boolean
 *                       description: 用户状态（true[0] 可用状态，false[1] 注销不可用状态）
 *                       example: true
 *                     createTime:
 *                       type: string
 *                       description: 创建时间
 *                     updateTime:
 *                       type: string
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 更新指定用户信息完成
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.put('/coffee/user', updatePointerUser);

/**
 * @swagger
 * /coffee/user:
 *   delete:
 *     summary: 注销用户
 *     description: 注销指定的用户
 *     tags: [用户管理]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: 'id'
 *         schema:
 *           type: string
 *         required: true
 *         description: Numberice ID of the user_manager to delete
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   format: int64
 *                   example: 200
 *                 data:
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 删除指定用户成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.delete('/coffee/user', delPointerUser);

/**
 * @swagger
 * /coffee/user/fuzzyquery:
 *   post:
 *     summary: 模糊搜索
 *     description: 根据用户名进行模糊搜索匹配
 *     tags: [用户管理]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: "请求参数"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 description: 搜索的用户名，可支持模糊搜索匹配
 *                 required: true
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               search:
 *                 type: string
 *                 description: 搜索的用户名，可支持模糊搜索匹配
 *                 example: ro
 *             required:
 *               - search
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
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
 *                         description: 数据项唯一id
 *                         example: '23eosis200'
 *                       userName:
 *                         type: string
 *                         description: 用户姓名
 *                         example: 'root'
 *                       userFullName:
 *                         type: string
 *                         description: 用户全名称
 *                         example: '超级管理员'
 *                       userRole:
 *                         type: number
 *                         description: 用户角色
 *                         example: 3
 *                       avatar:
 *                         type: string
 *                         description: 用户头像
 *                         example: 'http://example/static/img.png'
 *                       tel:
 *                         type: string
 *                         description: 用户手机号码
 *                         example: 13239844923
 *                       status:
 *                         type: boolean
 *                         description: 用户状态（true[0] 可用状态，false[1] 注销不可用状态）
 *                         example: true
 *                       createTime:
 *                         type: string
 *                         description: 创建时间
 *                       updateTime:
 *                         type: string
 *                         description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 模糊查询成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/fuzzyquery', fuzzyQuery);

module.exports = router;
