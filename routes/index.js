const Router = require('koa-router')
const { homePage } = require('../apis/indexApi')

const router = new Router();

router.get('/', homePage);

module.exports = router;
