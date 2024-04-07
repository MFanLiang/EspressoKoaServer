const Router = require('koa-router');
const router = new Router();
const { sendMail } = require("../apis/emailApi");

router.post('/coffee/send-email', sendMail);

module.exports = router;
