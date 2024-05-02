/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 20:45:12
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-05-02 23:57:10
 * @FilePath: \EspressoKoaServer\routes\common_server.js
 * @Description: 公共的服务-接口路由
 */

const models = require('@db/index');

const Router = require('koa-router');
const router = new Router();
const { getAllSysDist, getPointerDict, addDictTypeData, addDataByType } = require("./../apis/commonApi");

/**
 * @swagger
 * /coffee/getAllDict:
 *   get:
 *     summary: 获取所有数据字典
 *     description: 读取系统中所有的数据字典
 *     tags: [公共模块]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
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
 *                     userRoleType:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                             description: 字典标签
 *                           value:
 *                             type: string
 *                             description: 字典键值
 *                           type:
 *                             type: string
 *                             description: 字典数据类型
 *                           sort:
 *                             type: number
 *                             description: 字典数据的排序
 *                           status:
 *                             type: boolean
 *                             description: 字典数据状态
 *                           remark:
 *                             type: string
 *                             description: 字典数据的注释解释说明文案
 *                           createBy:
 *                             type: string
 *                             description: 字典数据创建人
 *                           createTime:
 *                             type: string
 *                             description: 字典数据创建时间
 *                           updateBy:
 *                             type: string
 *                             description: 字典数据更新人
 *                           updateTime:
 *                             type: string
 *                             description: 字典数据更新时间
 *                 message:
 *                   type: string
 *                   example: 数据字典查询返回成功
 */
router.get('/coffee/getAllDict', getAllSysDist);

/**
 * @swagger
 * /coffee/getPointerDict:
 *   get:
 *     summary: 查询指定的字典数据
 *     description: 根据指定的id值查询字典数据，只返回当前传入id的字典数据
 *     tags: [公共模块]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: 'id'
 *         schema:
 *           type: string
 *         required: true
 *         description: Numberice ID of the sys_dict_data to query
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         description: 字典标签
 *                       value:
 *                         type: string
 *                         description: 字典键值
 *                       type:
 *                         type: string
 *                         description: 字典数据类型
 *                       sort:
 *                         type: number
 *                         description: 字典数据的排序
 *                       status:
 *                         type: boolean
 *                         description: 字典数据状态
 *                       remark:
 *                         type: string
 *                         description: 字典数据的注释解释说明文案
 *                       createBy:
 *                         type: string
 *                         description: 字典数据创建人
 *                       createTime:
 *                         type: string
 *                         description: 字典数据创建时间
 *                       updateBy:
 *                         type: string
 *                         description: 字典数据更新人
 *                       updateTime:
 *                         type: string
 *                         description: 字典数据更新时间
 *                 message:
 *                   type: string
 *                   example: 类型为 [sourceType] 的数据字典查询成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.get("/coffee/getPointerDict", getPointerDict);

/**
 * @swagger
 * /coffee/addDictType:
 *   post:
 *     summary: 添加数据字典类型
 *     description: 添加数据字典类型的数据
 *     tags: [公共模块]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: "请求入参描述"
 *       required: true
 *       content:
 *         appliaction/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 字典名称
 *               type:
 *                 type: string
 *                 description: 字典类型
 *               status:
 *                 type: boolean
 *                 description: 字典的状态
 *               remark:
 *                 type: string
 *                 description: 字典的额外描述解释文案
 *               createBy:
 *                 type: string
 *                 description: 字典的创建人
 *               updateBy:
 *                 type: string
 *                 description: 字典的更新人
 *             example:
 *               name: 用户角色
 *               type: 'userRoleType'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               name:
 *                 type: string
 *                 description: 字典名称
 *               type:
 *                 type: string
 *                 description: 字典类型
 *               status:
 *                 type: boolean
 *                 description: 字典的状态
 *               remark:
 *                 type: string
 *                 description: 字典的额外描述解释文案
 *               createBy:
 *                 type: string
 *                 description: 字典的创建人
 *               updateBy:
 *                 type: string
 *                 description: 字典的更新人
 *             required:
 *               - name
 *               - type
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
 *                     id:
 *                       type: string
 *                       description: 数据唯一id
 *                     name:
 *                       type: string
 *                       description: 字典名称
 *                     type:
 *                       type: string
 *                       description: 字典类型
 *                     status:
 *                       type: boolean
 *                       description: 字典的状态
 *                     remark:
 *                       type: string
 *                       description: 字典的额外描述解释文案
 *                     createBy:
 *                       type: string
 *                       description: 字典的创建人
 *                     createTime:
 *                       type: string
 *                       description: 创建时间
 *                     updateBy:
 *                       type: string
 *                       description: 字典的更新人
 *                     updateTime:
 *                       type: string
 *                       description: 更新时间
 *                 message:
 *                   type: string
 *                   example: 操作成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post("/coffee/addDictType", addDictTypeData);

/**
 * @swagger
 * /coffee/addDataByType:
 *   post:
 *     summary: 添加字典数据
 *     description: 根据数据字典类型添加n个数据实体
 *     tags: [公共模块]
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
 *               label:
 *                 type: string
 *                 description: 字典数据的标签
 *               value:
 *                 type: string
 *                 description: 字典数据的键值
 *               type:
 *                 type: 'string'
 *                 description: 字典的类型
 *               sort:
 *                 type: 'number'
 *                 description: 字典的排序序列
 *               status:
 *                 type: boolean
 *                 description: 字典的状态
 *               remark:
 *                 type: 'string'
 *                 description: 字典的描述解释文案
 *               createBy:
 *                 type: 'string'
 *                 description: 字典的创建人
 *               updateBy:
 *                 type: 'string'
 *                 description: 字典的更新人
 *             example:
 *               label: '访客用户'
 *               value: '4'
 *               type: 'userRoleType'
 *               sort: 5
 *               status: true
 *               remark: '访客的描述文案'
 *               createBy: 'xiaomengge'
 *               updateBy: 'xiaomengge'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             properties:
 *               label:
 *                 type: string
 *                 description: 字典数据的标签
 *               value:
 *                 type: string
 *                 description: 字典数据的键值
 *               type:
 *                 type: 'string'
 *                 description: 字典的类型
 *               sort:
 *                 type: 'number'
 *                 description: 字典的排序序列
 *               status:
 *                 type: boolean
 *                 description: 字典的状态
 *               remark:
 *                 type: 'string'
 *                 description: 字典的描述解释文案
 *               createBy:
 *                 type: 'string'
 *                 description: 字典的创建人
 *               updateBy:
 *                 type: 'string'
 *                 description: 字典的更新人
 *             required:
 *               - label
 *               - value
 *               - type
 *               - sort
 *     responses:
 *       '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    format: int64
 *                    example: 200
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: 数据项唯一id
 *                        example: '22de27f0'
 *                      label:
 *                        type: string
 *                        description: 字典数据的标签
 *                      value:
 *                        type: string
 *                        description: 字典数据的键值
 *                      type:
 *                        type: 'string'
 *                        description: 字典的类型
 *                      sort:
 *                        type: 'number'
 *                        description: 字典的排序序列
 *                      status:
 *                        type: boolean
 *                        description: 字典的状态
 *                      remark:
 *                        type: string
 *                        description: 字典的额外描述解释文案
 *                      createBy:
 *                        type: string
 *                        description: 字典的创建人
 *                      createTime:
 *                        type: string
 *                        description: 创建时间
 *                      updateBy:
 *                        type: string
 *                        description: 字典的更新人
 *                      updateTime:
 *                        type: string
 *                        description: 更新时间
 *                  message:
 *                    type: string
 *                    example: 操作成功
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post("/coffee/addDataByType", addDataByType);

module.exports = router;
