const Router = require('koa-router');
const router = new Router();
const { rundbSyncShell } = require('../apis/sysConfigApi');

/** 执行同步数据库模型命令 */
router.get('/coffee/rundbSyncShell', rundbSyncShell);

module.exports = router;
