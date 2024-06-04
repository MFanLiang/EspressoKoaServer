/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 11:43:51
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-05-21 00:29:58
 * @FilePath: \EspressoKoaServer\routes\coffee_server.js
 * @Description: 咖啡数据列表服务-接口路由
 */

const Router = require('koa-router');
const {
  addCoffeeListItem,
  delCoffeeItemById,
  getCoffeeList,
  updateCoffeeItemById,
  pageSearchlistForCoffeeList
} = require('../apis/coffeeApi');

const router = new Router();

/**
 * @swagger
 * /coffee/incrementCoffeeItem:
 *   post:
 *     summary: 咖啡产品添加
 *     description: 用于添加自定义的咖啡产品数据，单个数据项的添加
 *     tags: [业务模块]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: "请求入参描述"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: 'string'
 *                 description: 咖啡具的产品名称
 *               color:
 *                 type: 'string'
 *                 description: 产品颜色色值
 *               count:
 *                 type: 'number'
 *                 description: 数量
 *               price:
 *                 type: 'number'
 *                 description: 价格
 *               description:
 *                 type: 'string'
 *                 description: 描述信息
 *               type:
 *                 type: 'string'
 *                 description: 类型
 *               isFlush:
 *                 type: 'boolean'
 *                 description: 是否需要冲洗
 *               isHot:
 *                 type: 'boolean'
 *                 description: 是否会变热
 *               author:
 *                 type: 'string'
 *                 description: 提交人(作者)
 *             example:
 *               name: '手冲壶'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               name:
 *                 type: 'string'
 *                 description: 咖啡具的产品名称
 *               color:
 *                 type: 'string'
 *                 description: 产品颜色色值
 *               count:
 *                 type: 'number'
 *                 description: 数量
 *               price:
 *                 type: 'number'
 *                 description: 价格
 *               description:
 *                 type: 'string'
 *                 description: 描述信息
 *               type:
 *                 type: 'string'
 *                 description: 类型
 *               isFlush:
 *                 type: 'boolean'
 *                 description: 是否需要冲洗
 *               isHot:
 *                 type: 'boolean'
 *                 description: 是否会变热
 *               author:
 *                 type: 'string'
 *                 description: 提交人(作者)
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Ok
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
 *                       example: '22de27f0'
 *                     name:
 *                       type: string
 *                       description: 咖啡具的产品名称
 *                       example: 手冲壶
 *                     color:
 *                       type: 'string'
 *                       description: 产品颜色色值
 *                       example: orange
 *                     count:
 *                       type: 'number'
 *                       description: 数量
 *                       example: 10
 *                     price:
 *                       type: 'number'
 *                       description: 价格
 *                       example: 108
 *                     description:
 *                       type: 'string'
 *                       description: 描述信息
 *                       example: 滤纸*********
 *                     type:
 *                       type: 'string'
 *                       description: 类型
 *                       example: '2'
 *                     isFlush:
 *                       type: 'boolean'
 *                       description: 是否需要冲洗
 *                       example: 0
 *                     isHot:
 *                       type: 'boolean'
 *                       description: 是否会变热
 *                       example: 1
 *                     author:
 *                       type: 'string'
 *                       description: 提交人(作者)
 *                       example: tom
 *                     createTime:
 *                       type: 'string'
 *                       description: 创建时间
 *                       example: '2024-04-09T15:02:08.623Z'
 *                     updateTime:
 *                       type: 'string'
 *                       description: 更新时间
 *                       example: '2024-04-09T15:02:08.623Z'
 *                 message:
 *                   type: string
 *                   example: '添加咖啡产品成功'
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/incrementCoffeeItem', addCoffeeListItem);

/**
 * @swagger
 *   /coffee/delCoffeeItemById:
 *     delete:
 *       summary: 咖啡产品删除
 *       description: 用于删除一个自定义的咖啡产品数据，单个数据项的删除
 *       tags: [业务模块]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: query
 *           name: 'id'
 *           schema:
 *             type: string
 *           required: true
 *           description: Numberice ID of the coffee_list to delete
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
 *                     example: null
 *                   message:
 *                     type: string
 *                     example: 数据删除成功
 *         '400':
 *           description: 请求参数错误
 *         '401':
 *           description: Protected resource, use Authorization header to get access
 *         '404':
 *           description: 请求资源未找到
 */
router.delete('/coffee/delCoffeeItemById', delCoffeeItemById);

/**
 * @swagger
 *   /coffee/coffeelist:
 *     get:
 *       summary: 读取咖啡产品
 *       description: 获取咖啡产品所有数据列表
 *       tags: [业务模块]
 *       security:
 *         - BearerAuth: []
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
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 数据项唯一id
 *                           example: '22de27f0'
 *                         name:
 *                           type: string
 *                           description: 咖啡具的产品名称
 *                           example: 手冲壶
 *                         color:
 *                           type: 'string'
 *                           description: 产品颜色色值
 *                           example: orange
 *                         count:
 *                           type: 'number'
 *                           description: 数量
 *                           example: 10
 *                         price:
 *                           type: 'number'
 *                           description: 价格
 *                           example: 108
 *                         description:
 *                           type: 'string'
 *                           description: 描述信息
 *                           example: 滤纸*********
 *                         type:
 *                           type: 'string'
 *                           description: 类型
 *                           example: '2'
 *                         isFlush:
 *                           type: 'boolean'
 *                           description: 是否需要冲洗
 *                           example: 0
 *                         isHot:
 *                           type: 'boolean'
 *                           description: 是否会变热
 *                           example: 1
 *                         author:
 *                           type: 'string'
 *                           description: 提交人(作者)
 *                           example: tom
 *                         createTime:
 *                           type: 'string'
 *                           description: 创建时间
 *                           example: '2024-04-09T15:02:08.623Z'
 *                         updateTime:
 *                           type: 'string'
 *                           description: 更新时间
 *                           example: '2024-04-09T15:02:08.623Z'
 *                   message:
 *                     type: string
 *                     example: 查询咖啡产品列表数据已成功
 *                   total:
 *                     type: number
 *                     description: 列表数据总数
 *                     example: 0
 *         '400':
 *           description: 请求参数错误
 *         '401':
 *           description: Protected resource, use Authorization header to get access
 *         '404':
 *           description: 请求资源未找到
 */
router.get('/coffee/coffeelist', getCoffeeList);

/**
 * @swagger
 *   /coffee/updateCoffeeItem:
 *     put:
 *       summary: 更新某个咖啡产品
 *       description: 用于更新一个自定义的咖啡产品数据，单个数据项的更新
 *       tags: [业务模块]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: '请求入参描述'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   required: true
 *                   description: 数据唯一id
 *                 name:
 *                   type: string
 *                   description: 咖啡具的产品名称
 *                 color:
 *                   type: 'string'
 *                   description: 产品颜色色值
 *                 count:
 *                   type: 'number'
 *                   description: 数量
 *                 price:
 *                   type: 'number'
 *                   description: 价格
 *                 description:
 *                   type: 'string'
 *                   description: 描述信息
 *                 type:
 *                   type: 'string'
 *                   description: 类型
 *                 isFlush:
 *                   type: 'boolean'
 *                   description: 是否需要冲洗
 *                 isHot:
 *                   type: 'boolean'
 *                   description: 是否会变热
 *                 author:
 *                   type: 'string'
 *                   description: 提交人(作者)
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *               properties:
 *                 id:
 *                   type: 'string'
 *                   required: true
 *                   description: 数据唯一id
 *                 name:
 *                   type: 'string'
 *                   description: 咖啡具的产品名称
 *                 color:
 *                   type: 'string'
 *                   description: 产品颜色色值
 *                 count:
 *                   type: 'number'
 *                   description: 数量
 *                 price:
 *                   type: 'number'
 *                   description: 价格
 *                 description:
 *                   type: 'string'
 *                   description: 描述信息
 *                 type:
 *                   type: 'string'
 *                   description: 类型
 *                 isFlush:
 *                   type: 'boolean'
 *                   description: 是否需要冲洗
 *                 isHot:
 *                   type: 'boolean'
 *                   description: 是否会变热
 *                 author:
 *                   type: 'string'
 *                   description: 提交人(作者)
 *               required:
 *                 - id
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
 *                     example: null
 *                   message:
 *                     type: string
 *                     example: '数据更新成功'
 *         '400':
 *           description: 请求参数错误
 *         '401':
 *           description: Protected resource, use Authorization header to get access
 *         '404':
 *           description: 请求资源未找到
 */
router.put('/coffee/updateCoffeeItem', updateCoffeeItemById);

/**
 * @swagger
 * /coffee/coffeeSearch:
 *   post:
 *     summary: 模糊搜索数据
 *     description: 用以模糊搜索咖啡的某些数据项
 *     tags: [业务模块]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: 请求入参描述
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 咖啡具的产品名称
 *               color:
 *                 type: string
 *                 description: 产品颜色色值
 *               isFlush:
 *                 type: boolean
 *                 description: 是否需要冲洗
 *               isHot:
 *                 type: 'boolean'
 *                 description: 是否会变热
 *               author:
 *                 type: 'string'
 *                 description: 提交人(作者)
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               name:
 *                 type: 'string'
 *                 description: 咖啡具的产品名称
 *               color:
 *                 type: 'string'
 *                 description: 产品颜色色值
 *               isFlush:
 *                 type: 'boolean'
 *                 description: 是否需要冲洗
 *               isHot:
 *                 type: 'boolean'
 *                 description: 是否会变热
 *               author:
 *                 type: 'string'
 *                 description: 提交人(作者)
 *     responses:
 *       '200':
 *         description: Ok
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
 *                         example: '22de27f0'
 *                       name:
 *                         type: string
 *                         description: 咖啡具的产品名称
 *                         example: 手冲壶
 *                       color:
 *                         type: 'string'
 *                         description: 产品颜色色值
 *                         example: orange
 *                       count:
 *                         type: 'number'
 *                         description: 数量
 *                         example: 10
 *                       price:
 *                         type: 'number'
 *                         description: 价格
 *                         example: 108
 *                       description:
 *                         type: 'string'
 *                         description: 描述信息
 *                         example: 滤纸*********
 *                       type:
 *                         type: 'string'
 *                         description: 类型
 *                         example: '2'
 *                       isFlush:
 *                         type: 'boolean'
 *                         description: 是否需要冲洗
 *                         example: 0
 *                       isHot:
 *                         type: 'boolean'
 *                         description: 是否会变热
 *                         example: 1
 *                       author:
 *                         type: 'string'
 *                         description: 提交人(作者)
 *                         example: tom
 *                       createTime:
 *                         type: 'string'
 *                         description: 创建时间
 *                         example: '2024-04-09T15:02:08.623Z'
 *                       updateTime:
 *                         type: 'string'
 *                         description: 更新时间
 *                         example: '2024-04-09T15:02:08.623Z'
 *                 message:
 *                   type: string
 *                   example: '模糊查询成功'
 *                 total:
 *                   type: number
 *                   example: 20
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
router.post('/coffee/coffeeSearch', pageSearchlistForCoffeeList);

module.exports = router;
