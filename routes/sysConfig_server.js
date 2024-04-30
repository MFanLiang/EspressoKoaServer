/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-09 02:33:13
 * @FilePath: \koa-generator\routes\sysConfig_server.js
 * @Description: 系统配置相关服务-接口路由
 */

const Router = require('koa-router');
const router = new Router();
const { rundbSyncShell } = require('../apis/sysConfigApi');

/** 执行同步数据库模型命令 */
/**
 * @swagger
 * /coffee/rundbSyncShell:
 *   get:
 *     summary: 数据库表的同步
 *     description: 执行同步数据库所有表指令
 *     tags: [公共模块]
 *     responses:
 *       200:
 *         description: 所有模型均已同步完成
 *       400:
 *         description: 模型同步失败，接口异常退出
 */
router.get('/coffee/rundbSyncShell', rundbSyncShell);

module.exports = router;
