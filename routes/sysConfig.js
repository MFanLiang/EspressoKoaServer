/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 20:42:45
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 20:45:38
 * @FilePath: \koa-generator\routes\sysConfig.js
 * @Description: 系统配置相关接口服务
 */

const Router = require('koa-router');
const router = new Router();
const { rundbSyncShell } = require('../apis/sysConfigApi');

/** 执行同步数据库模型命令 */
router.get('/coffee/rundbSyncShell', rundbSyncShell);

module.exports = router;
