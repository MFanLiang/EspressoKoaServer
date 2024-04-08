/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 16:44:05
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 02:22:26
 * @FilePath: \koa-generator\routes\email_server.js
 * @Description: 邮箱服务-接口路由
 */

const Router = require('koa-router');
const router = new Router();
const { sendMail } = require("../apis/emailApi");

/**
 * @swagger
 * /coffee/send-email:
 *   post:
 *     description: 发送邮件服务
 *     tags: [公共模块]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/coffee/send-email', sendMail);

module.exports = router;
