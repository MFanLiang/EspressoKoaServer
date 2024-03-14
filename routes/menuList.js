const Router = require('koa-router');
const { getMenuList } = require('../apis/menuListApi');

const router = new Router;

/**
 * @swagger
 * tags:
 *    name: 菜单管理
 *    desription: Menu management
 */

router.get('/sys/menu/list', getMenuList);

module.exports = router;
