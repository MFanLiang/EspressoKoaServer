/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-11-23 21:46:40
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-19 13:33:49
 * @FilePath: \EspressoKoaServer\routes\user_server.js
 * @Description: 用户操作管理服务-接口路由
 */

const Router = require('koa-router');
const {
  register,
  login,
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
 *       description: "登录请求参数"
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
 *                     username:
 *                       type: string
 *                       description: 用户姓名
 *                       example: 'root'
 *                     user_full_name:
 *                       type: string
 *                       description: 用户全名称
 *                       example: '超级管理员'
 *                     user_role:
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
 *                     createdAt:
 *                       type: string
 *                       description: 创建时间
 *                     updatedAt:
 *                       type: string
 *                       description: 更新时间
 *                 msg:
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
 *   post:
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
 *                       username:
 *                         type: string
 *                         description: 用户姓名
 *                         example: 'root'
 *                       user_full_name:
 *                         type: string
 *                         description: 用户全名称
 *                         example: '超级管理员'
 *                       user_role:
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
 *                       createdAt:
 *                         type: string
 *                         description: 创建时间
 *                       updatedAt:
 *                         type: string
 *                         description: 更新时间
 *                 msg:
 *                   type: string
 *                   example: 查询所有用户信息已完成
 *                 total:
 *                   type: number
 *                   example: 1
 *                 pagesize:
 *                   type: number
 *                   example: 10
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/user/user-all-info', getAllUser);

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
 *               username:
 *                 type: string
 *                 description: 用户姓名
 *                 example: 'root'
 *               user_full_name:
 *                 type: string
 *                 description: 用户全名称
 *                 example: '超级管理员'
 *               user_role:
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
 *               username:
 *                 type: string
 *                 description: 用户姓名
 *               user_full_name:
 *                   type: string
 *                   description: 用户全名称
 *               user_role:
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
 *                     username:
 *                       type: string
 *                       description: 用户姓名
 *                       example: 'root'
 *                     user_full_name:
 *                       type: string
 *                       description: 用户全名称
 *                       example: '超级管理员'
 *                     user_role:
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
 *                     createdAt:
 *                       type: string
 *                       description: 创建时间
 *                     updatedAt:
 *                       type: string
 *                       description: 更新时间
 *                 msg:
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
 *                 msg:
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
 *                       username:
 *                         type: string
 *                         description: 用户姓名
 *                         example: 'root'
 *                       user_full_name:
 *                         type: string
 *                         description: 用户全名称
 *                         example: '超级管理员'
 *                       user_role:
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
 *                       createdAt:
 *                         type: string
 *                         description: 创建时间
 *                       updatedAt:
 *                         type: string
 *                         description: 更新时间
 *                 msg:
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
