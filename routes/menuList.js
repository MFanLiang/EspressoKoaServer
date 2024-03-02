const Router = require('koa-router');
const { getMenuList } = require('../apis/menuListApi');

const router = new Router;

router.get('/sys/menu/list', getMenuList);

module.exports = router;
