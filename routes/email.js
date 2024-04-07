/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 16:44:05
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 21:02:30
 * @FilePath: \koa-generator\routes\email.js
 * @Description: 邮箱服务接口路由
 */

const Router = require('koa-router');
const router = new Router();
const { sendMail } = require("../apis/emailApi");

router.post('/coffee/send-email', sendMail);

module.exports = router;
