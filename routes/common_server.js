/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 20:45:12
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 02:05:46
 * @FilePath: \koa-generator\routes\common_server.js
 * @Description: 公共的服务-接口路由
 */

const models = require('@db/index');

const Router = require('koa-router');
const router = new Router();
const { getAllSysDist } = require("./../apis/commonApi");

/**
 * @swagger
 * /coffee/getAllDict:
 *   get:
 *     summary: 数据字典
 *     description: 获取数据字典
 *     tags: [公共模块]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 数据字典查询返回成功
 */
router.get('/coffee/getAllDict', getAllSysDist);

exports.models = router;
