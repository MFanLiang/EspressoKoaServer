/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-07-30 17:12:28
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 23:52:07
 * @FilePath: \koa-generator\routes\index.js
 * @Description: 默认(测试)服务-接口路由
 */

const Router = require('koa-router');
const { homePage } = require('../apis/indexApi');
const swaggerUI = require('koa2-swagger-ui').koaSwagger;
const swaggerSpec = require('../config/swagger.config');
const router = new Router();

/**
 * @swagger
 * tags:
 *    name: 系统测试接口
 *    desription: sys test API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 服务系统接口
 *     description: 获取服务默认首页数据
 *     tags: [系统测试接口]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 */
router.get('/', homePage);

/**
 * @swagger
 * /swagger:
 *   get:
 *     summary: swagger-UI
 *     description: 提供 swagger 在线接口 API 文档界面
 *     tags: [系统测试接口]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 */
router.get(
  '/swagger',
  swaggerUI({
    routePrefix: '/swagger',
    swaggerOptions: {
      spec: swaggerSpec,
      url: 'http://localhost:5050/swagger'
    },
  })
);

module.exports = router;
