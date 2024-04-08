/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-07-30 17:12:28
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 02:27:35
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
 *    name: default-api
 *    desription: sys default API
 */

/**
 * @swagger
 * tags:
 *    name: 公共模块
 *    desription: base module API
 */

/**
 * @swagger
 * tags:
 *    name: 菜单管理
 *    desription: Menu management
 */

/**
 * @swagger
 * tags:
 *    name: 文件服务
 *    desription: File management
 */

/**
 * @swagger
 * tags:
 *    name: 用户管理
 *    desription: User management
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: HomePage Index
 *     description: Returns the homePage
 *     tags: [default-api]
 *     responses:
 *       200:
 *         description: "hello Word 你好世界 Koa Server default page!"
 */
router.get('/', homePage);

/**
 * @swagger
 * /swagger:
 *   get:
 *     summary: swagger-UI
 *     description: 提供 swagger 在线接口 API 文档界面
 *     tags: [default-api]
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
