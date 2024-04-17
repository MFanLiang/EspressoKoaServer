/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 16:44:05
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-10 15:40:50
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
 *     summary: 邮件服务
 *     description: 发送邮件服务
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
 *               from:
 *                 type: string
 *                 description: '发件人邮箱号'
 *               subject:
 *                 type: string
 *                 description: '邮件的标题'
 *               to:
 *                 type: string
 *                 description: '收件人邮箱号'
 *               html:
 *                 type: string
 *                 description: '邮件内容，可以是纯字符串格式，也可以是支持W3C标准的超文本标记语言'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: '发件人邮箱号'
 *               subject:
 *                 type: string
 *                 description: '邮件的标题'
 *               to:
 *                 type: string
 *                 description: '收件人邮箱号'
 *               html:
 *                 type: string
 *                 description: '邮件内容，可以是纯字符串格式，也可以是支持W3C标准的超文本标记语言'
 *             required:
 *               - from
 *               - subject
 *               - to
 *               - html
 *     responses:
 *       200:
 *         description: OK
 *       '400':
 *         description: 请求参数错误
 *       '401':
 *         description: Protected resource, use Authorization header to get access
 *       '404':
 *         description: 请求资源未找到
 */
router.post('/coffee/send-email', sendMail);

module.exports = router;
